import React, {useEffect, useReducer, useState} from 'react';
import {
    Button,
    Col,
    Container,
    FormLabel,
    ListGroup,
    ListGroupItem,
    Row
} from "react-bootstrap";
import axios from "axios";
import '../../styles/shows.css'
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-regular-svg-icons";
import {addTime} from "../../Helpers/TimeHelper";

const Tickets = (props) => {

    const {filmId, showId, hour, roomId} = props


    const [showData, setShowData] = useState({})
    const [roomData, setRoomData] = useState({})
    const [filmData, setFilmData] = useState({})
    const [ticketCount, setTicketCount] = useState(0)
    const [freeSeatsCount, setFreeSeatsCount] = useState(0)
    const [endTime, setEndTime] = useState("")
    const integerPattern = /[0-9]{0,10}/i
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        const fetchData = async () =>{


            const showsConfig = {
                method: "get",
                url: `http://localhost:7777/show/${showId}/details`,
                headers: { }
            }

            try{
                const response = await axios(showsConfig)
                setShowData(response.data)

            } catch (err) {
                console.log("error fetching show data: ", err)
            }
            let sd = showData
            const roomsConfig = {
                method: "get",
                url: `http://localhost:7777/room/${roomId}/details`,
                headers: { }
            }

            try{
                const response = await axios(roomsConfig)
                setRoomData(response.data)

            } catch (err) {
                console.log("error fetching room data: ", err)
            }


            const filmConfig = {
                method: "get",
                url: `http://localhost:7777/film/${filmId}/details`,
                headers: { }
            }

            try{
                const response = await axios(filmConfig)
                setFilmData(response.data)

            } catch (err) {
                console.log("error fetching room data: ", err)
            }

        }
        fetchData()
            .then((e) => {
                setIsLoaded(true)

            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        setEndTime(addTime(hour, filmData.runtimeStr))
    }, [filmData])

    useEffect(()=>{
        if (!isLoaded) return
        let tempCount = getFreeSeatsCount(roomData.capacity, hour)
        setFreeSeatsCount(tempCount)
    }, [isLoaded])


    function getFreeSeatsCount(roomCapacity, hour) {
        if(roomCapacity === undefined) return 0
        if(!(hour in showData.soldTickets)) showData.soldTickets[hour] = 0
        let soldTicketsCount = showData.soldTickets[hour]
        let result = parseInt(roomCapacity) - soldTicketsCount
        if(isNaN(result))
            return roomCapacity

        return result
    }

    const buyTickets = () => {
        if (showData.soldTickets[hour] + ticketCount > roomData.capacity){
            alert("Not enough free seats!")
            return
        }
        if (showData.soldTickets[hour] == null) showData.soldTickets[hour] = 0
        showData.soldTickets[hour] += ticketCount
        axios.put(`http://localhost:7777/show/${showData.showId}`, showData)
            .then(() => {
                // if (freeSeatsCount === undefined) setFreeSeatsCount(roomData.capacity)
                setFreeSeatsCount(getFreeSeatsCount(roomData.capacity, hour))
                alert(`Successfully reserved ${ticketCount} places`)
            })
    }

    const increment = () =>{
        let i = ticketCount
        setTicketCount(++i)
    }
    const decrement = () =>{
        if (ticketCount == 0) return
        let i = ticketCount
        setTicketCount(--i)
    }

    return (
        <div>
            <Container>
                <Row>
                    {isLoaded? (
                        <ListGroup variant={'flush'}>
                            <ListGroupItem id={'filmNameInfo'}>
                                <span className={"param"}>FILM</span>{filmData.title}
                            </ListGroupItem>
                            <ListGroupItem id={'filmStartInfo'}>
                                <span className={"param"}>START</span>{hour}
                            </ListGroupItem>
                            <ListGroupItem id={'roomIdInfo'}>
                                <span className={"param"}>ROOM</span>{showData.roomId}
                            </ListGroupItem>
                            <ListGroupItem id={'durationInfo'}>
                                <span className={"param"}>TIME</span>{filmData.runtimeStr}
                            </ListGroupItem>
                            <ListGroupItem id={'estimatedEndInfo'}>
                                <span className={"param"}>~END</span>
                                {endTime}
                            </ListGroupItem>
                        </ListGroup>
                    ) : null}
                </Row>
                <Row>

                    <Container>
                        <Row>
                            <Col>
                                <h1>Regular Ticket</h1>
                            </Col>
                            <Col>
                                <Button onClick={() => decrement()}>-</Button>
                            </Col>
                            <Col>
                                <span className={"param"}>{ticketCount}</span>
                            </Col>
                            <Col>
                                <Button onClick={() => increment()}>+</Button>
                            </Col>
                            <Col>
                                <p><span className={"param"}>Free Seats:</span>{freeSeatsCount}</p>
                            </Col>
                        </Row>
                    </Container>
                    <Button variant="primary" onClick={() => buyTickets()}>
                        <FAI icon={faSave}/>
                    </Button>
                </Row>
            </Container>
        </div>
    );
};

export default Tickets;