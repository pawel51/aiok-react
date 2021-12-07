import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Badge, Col, Container, Image, ListGroup, ListGroupItem, Row, Spinner, Table, Button} from "react-bootstrap";
import * as PropTypes from "prop-types";
import '../../styles/shows.css'
import {Link, withRouter} from "react-router-dom";
import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import {compareTwoDates, checkIfTimeIsBetween, addTime} from "../../Helpers/TimeHelper";
import {forEach} from "react-bootstrap/ElementChildren";

const CurrentShows = () => {
    const [showsData, setShowsData] = useState([]);


    const [date, setDate] = useState(new Date(Date.now()))
    const [filmsData, setFilmsData] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [filmsAreLoaded, setFilmsLoaded] = useState(false)

    const [IdNameMap, setIdNameMap] = useState(new Map())
    const [IdImgMap, setIdImgMap] = useState(new Map())

    const [rooms, setRooms] = useState([])

    const [IdDurationMap, setIdDurationMap] = useState(new Map())
    const [currentTime, setCurrentTime] = useState(new Date(Date.now()).toISOString().substr(11,5))

    // const sortedShows = showsData.sort((a,b) => IdNameMap.get(a.id) > IdNameMap.get(b.id) ? 1 : -1)


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
            .then(() => {
                setLoaded(true);
                setFilmsLoaded(true);
            })
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
                const tempData = []
                const response = await axios(showsConfig)
                tempData.push(...(response["data"]).filter(e => compareTwoDates(new Date(e.date) ,date) === 0))


                // przefiltrowanie tylko trwających seansów
                let showsToShow = []    //seanse danego filmu do pokazania
                for (const show of tempData){
                    let showHours = []      //godziny danego seansu do pokazania
                    for (const hour of show.hours) {
                        if (checkIfTimeIsBetween(hour, addTime(currentTime, "1h 00min"), addTime(hour, IdDurationMap.get(show.filmId))))
                            showHours.push(hour)
                    }
                    if (showHours.length > 0){
                        show.hours = showHours
                        showsToShow.push(show)
                    }
                }
                setShowsData(showsToShow)

            } catch (err) {
                console.log("error fetching shows data: ", err)
            }
        }

        if(!filmsAreLoaded) return // najpierw załaduj filmy

        fetchData()
            .then(() => setLoaded(true))
            .catch(e => console.log(e))
    }, [date, currentTime, filmsAreLoaded])

    const changeDate = (e) => {
        setDate(new Date(e.target.value))
    }


    return (
        <div>

            <div className={"showScreen"}>


                <ListGroup className={"vList"} variant={"flush"}>
                    {showsData.map((show, i) => {
                        return <ListGroupItem key={i} className={"vListItem"}>
                            <ListGroup horizontal className={"hList"}>
                                <ListGroupItem className={"hListItem"}>

                                    <Image src={IdImgMap.get(show.filmId)}/>
                                </ListGroupItem>
                                <ListGroupItem className={"hListItem"}>
                                    <Badge className={"titleBadge"} bg={"info"}>{IdNameMap.get(show.filmId)}</Badge>
                                </ListGroupItem>
                                <ListGroupItem className={"hListItem runningShow"}>
                                    {show !== undefined ? (
                                        show.hours.sort((a,b) => a > b ? 1 : -1).map((hour, hourId) => {

                                            return (
                                                <Badge key={hourId} className={`offLink `} >
                                                    <span>Started at: {hour}</span>
                                                </Badge>
                                            )
                                        })
                                    ) : null }
                                </ListGroupItem>

                                {isLoaded? <ListGroupItem className={"hListItem"}>
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
                                    </ListGroupItem> : <Spinner animation="grow" variant="dark" />}
                            </ListGroup>
                        </ListGroupItem>
                    })}
                </ListGroup>

            </div>
        </div>
    );
};

export default withRouter(CurrentShows) ;