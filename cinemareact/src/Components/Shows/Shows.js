import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Badge, ListGroup, ListGroupItem, Spinner, Table} from "react-bootstrap";


const Shows = (props) => {
    const [showsData, setShowsData] = useState([]);
    // const filmsData = props.filmData
    const [filmsData, setFilmsData] = useState([])
    const [roomsData, setRoomsData] = useState([])
    const [isLoaded, setLoaded] = useState(0)
    const [IdNameMap, setIdNameMap] = useState({})

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

                let map = {}
                filmsData.forEach(film => {
                    map.set(film.id, film.name)
                })
                setIdNameMap(map)
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
                <div>
                    <input type={"date"} id={"SelectedDate"}/>

                    <ListGroup variant={"flush"}>
                        {showsData.map((show) => {
                            return (
                                <ListGroup horizontal variant={"flush"}>
                                    <ListGroupItem>
                                        <Badge bg={"info"}>{IdNameMap.get(show.id)}</Badge>
                                        {show.hours.map((hour) => {
                                            return <Badge bg={"dark"}>{hour}</Badge>
                                        })}
                                    </ListGroupItem>
                                </ListGroup>
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