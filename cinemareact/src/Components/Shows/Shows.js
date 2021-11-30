import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Badge, Col, Container, Image, ListGroup, ListGroupItem, Row, Spinner, Table} from "react-bootstrap";
import * as PropTypes from "prop-types";
import '../../styles/shows.css'
import {Button} from "bootstrap";
import {Link} from "react-router-dom";

function Img(props) {
    return null;
}

Img.propTypes = {src: PropTypes.any};
const Shows = (props) => {
    const [showsData, setShowsData] = useState([]);
    // const filmsData = props.filmData
    const [filmsData, setFilmsData] = useState([])
    const [roomsData, setRoomsData] = useState([])
    const [isLoaded, setLoaded] = useState(0)
    const [IdNameMap, setIdNameMap] = useState(new Map())
    const [IdImgMap, setIdImgMap] = useState(new Map())

    useEffect(() => {
        const fetchData = async() => {

            const config = {
                method: "get",
                url: "http://localhost:7777/shows",
                headers: { }
            }
            const config2 = {
                method: "get",
                url: "http://localhost:7777/films",
                headers: { }
            }

            const config3 = {
                method: "get",
                url: "http://localhost:7777/rooms",
                headers: { }
            }
            try {
                const tempData = []
                const response = await axios(config)
                tempData.push(...response["data"])
                setShowsData(tempData)

                const tempData2 = []
                const response2 = await axios(config2)
                tempData2.push(...response2["data"])
                setFilmsData(tempData2)

                let idMap = new Map()
                tempData2.forEach(film => {
                    idMap.set(film.filmId, film.title)
                })
                setIdNameMap(idMap)
                let imgMap = new Map()
                tempData2.forEach(film => {
                    imgMap.set(film.filmId, film.smallImage)
                })
                setIdImgMap(imgMap)


                // const tempData3 = []
                // const response3 = await axios(config3)
                // tempData3.push(...response3["data"])
                // setFilmsData(tempData3)

            } catch (err) {
                console.log("error fetching img data", err)
            }
        }
        fetchData()
            .then(() => setLoaded(true))
    }, [])

    return (
        <div>
            {!isLoaded? (
                <Spinner animation="grow" variant="dark" />
            ) : (
                <div className={"showScreen"}>
                    <input type={"date"} id={"SelectedDate"}/>

                    <ListGroup className={"vList"} variant={"flush"}>
                        {showsData.map((show) => {
                            return (
                                    <ListGroupItem className={"vListItem"}>
                                        <ListGroup horizontal variant={"flush"} className={"hList"}>
                                            <ListGroupItem className={"hListItem"}>

                                                <Image src={IdImgMap.get(show.filmId)}/>
                                                <Badge className={"titleBadge"} bg={"info"}>{IdNameMap.get(show.filmId)}</Badge>

                                                {show.hours.map((hour, hourId) => {
                                                    return (
                                                            <Link className={"offLink"} to={`/show/tickets/${show.filmId}/${show.showId}/${hourId}`}>
                                                                {hour}
                                                            </Link>
                                                        )

                                                })}

                                            </ListGroupItem>
                                        </ListGroup>
                                    </ListGroupItem>


                                )

                        })}
                    </ListGroup>

                    {/*<Hour value={v}></Hour>*/}
                </div>
            )}
        </div>
    );
};

export default Shows;