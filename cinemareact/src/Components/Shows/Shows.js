import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Badge, Col, Container, Image, ListGroup, ListGroupItem, Row, Spinner, Table, Button} from "react-bootstrap";
import * as PropTypes from "prop-types";
import '../../styles/shows.css'
import {Link} from "react-router-dom";
import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import {compareTwoDates, checkIfTimeIsBetween, addTime} from "../../Helpers/TimeHelper";

const Shows = () => {
    const [showsData, setShowsData] = useState([]);


    const [date, setDate] = useState(new Date(Date.now()))
    const [filmsData, setFilmsData] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [IdNameMap, setIdNameMap] = useState(new Map())
    const [IdImgMap, setIdImgMap] = useState(new Map())

    const [rooms, setRooms] = useState([])

    const [IdDurationMap, setIdDurationMap] = useState(new Map())
    const [currentTime, setCurrentTime] = useState(new Date(Date.now()).toISOString().substr(11,5))

    const useInterval = (callback, delay) => {
        const savedCallback = React.useRef();

        React.useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        React.useEffect(() => {
            const tick = () => {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    };

    useInterval(() => {
        setCurrentTime(new Date(Date.now()).toISOString().substr(11,5))
    }, 60000)



    // działa tylko dla seansów z obecnej daty (nie z daty wybranej przez użytkownika!)
    const checkIfFilmIsShowing = (filmId, hour) =>
    {
        let endHour = addTime(hour, IdDurationMap.get(filmId))
        checkIfTimeIsBetween(hour, currentTime, endHour)
    }

    useEffect(() => {
        const fetchData = async () =>{
            const roomsConfig = {
                method: "get",
                url: "http://localhost:7777/rooms",
                headers: { }
            }
            try{
                const tempData = []
                const response = await axios(roomsConfig)
                tempData.push(...(response["data"]))
                setRooms(tempData)
            } catch (err) {
                console.log("error fetching shows data: ", err)
            }
        }
        fetchData()
            .then((r) => console.log(r))
            .catch(e => console.log(e))
    }, [])


    useEffect(() => {
        const fetchData = async() => {
            const filmsConfig = {
                method: "get",
                url: "http://localhost:7777/films",
                headers: { }
            }

            try {
                const tempData = []
                const response = await axios(filmsConfig)
                tempData.push(...response["data"])
                setFilmsData(tempData)

                let idMap = new Map()
                tempData.forEach(film => {
                    idMap.set(film.filmId, film.title)
                })
                setIdNameMap(idMap)
                let imgMap = new Map()
                tempData.forEach(film => {
                    imgMap.set(film.filmId, film.smallImage)
                })
                setIdImgMap(imgMap)
                let idDurationMap = new Map()
                tempData.forEach(film => {
                    idDurationMap.set(film.filmId, film.runtimeStr)
                })
                setIdDurationMap(idDurationMap)
            } catch (err) {
                console.log("error fetching films data:", err)
            }
        }
        fetchData()
            .then(() => setLoaded(true))
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        const fetchData = async () =>{
            const showsConfig = {
                method: "get",
                url: "http://localhost:7777/shows",
                headers: { }
            }
            try{
                let tempData = []
                const response = await axios(showsConfig)
                tempData.push(...(response["data"]).filter(e => compareTwoDates(new Date(e.date) ,date) === 0))

                tempData = tempData.map(show => {
                    let sum = 0
                    for (const key in show.soldTickets)
                        sum += show.soldTickets[key]
                    show.sum = sum
                    return show
                })

                tempData.sort((a,b) => a.sum < b.sum ? 1 : -1)



                setShowsData(tempData)
            } catch (err) {
                console.log("error fetching shows data: ", err)
            }
        }
        fetchData()
            .then(() => setLoaded(true))
            .catch(e => console.log(e))
    }, [date])

    const changeDate = (e) => {
        setDate(new Date(e.target.value))
    }


    return (
        <div>

            <div className={"showScreen"}>
                <div className={"topShowContainer"}>
                    <input type={"date"} id={"SelectedDate"} defaultValue={date.toISOString().substr(0,10)} className={"DateInput"} onChange={e => changeDate(e)}/>
                    <Add filmsList={filmsData} showsData={showsData} setShowsData={setShowsData} rooms={rooms}/>
                </div>

                <ListGroup className={"vList"} variant={"flush"}>
                    {showsData.map((show, i) => {
                        return (
                                <ListGroupItem key={i} className={"vListItem"}>
                                    <ListGroup horizontal className={"hList"}>
                                        <ListGroupItem className={"hListItem"}>
                                            <Badge>{i+1}</Badge>
                                        </ListGroupItem>
                                        <ListGroupItem className={"hListItem"}>
                                            <ListGroup>
                                                <span>Sold tickets today</span>
                                                <span>{show.sum}</span>
                                            </ListGroup>
                                        </ListGroupItem>
                                        <ListGroupItem className={"hListItem"}>

                                            <Image src={IdImgMap.get(show.filmId)}/>
                                        </ListGroupItem>
                                        <ListGroupItem className={"hListItem"}>
                                            <Badge className={"titleBadge"} bg={"info"}>{IdNameMap.get(show.filmId)}</Badge>
                                        </ListGroupItem>
                                        <ListGroupItem className={"hListItem"}>

                                            {show !== undefined ? (
                                                show.hours.sort((a,b) => a > b ? 1 : -1).map((hour, hourId) => {

                                                    return (
                                                        <Link key={hourId} className={"offLink"} to={`/show/tickets/${show.filmId}/${show.showId}/${hour}/${show.roomId}`}>
                                                            {hour}
                                                        </Link>
                                                    )
                                                })
                                            ) : null }
                                        </ListGroupItem>

                                            {isLoaded? (
                                                <ListGroupItem className={"hListItem"}>
                                                    <Edit showId={show.showId}
                                                          showsData={showsData}
                                                          setShowsData={setShowsData}
                                                          filmsData={filmsData}
                                                          showTitle={show.showId+" "+IdNameMap.get(show.filmId)}
                                                          hours={show.hours}
                                                          rooms={rooms}
                                                    />
                                                    <Delete showId={show.showId}
                                                            showsData={showsData}
                                                            setShowsData={setShowsData}
                                                            showTitle={show.showId+" "+IdNameMap.get(show.filmId)}
                                                            />
                                                </ListGroupItem>
                                                ) : (
                                                <Spinner animation="grow" variant="dark" />
                                            )}
                                    </ListGroup>
                                </ListGroupItem>
                            )
                        })}
                </ListGroup>

            </div>
        </div>
    );
};

export default Shows;