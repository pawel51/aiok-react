import React, {useEffect, useState} from 'react';
import {
    Badge,
    Button, Col,
    Container,
    FloatingLabel,
    Form,
    InputGroup,
    ListGroup,
    ListGroupItem,
    Modal,
    Row
} from "react-bootstrap";
import { useForm } from 'react-hook-form';
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import {faEdit, faPlusSquare, faSave, faArrowAltCircleRight} from "@fortawesome/free-regular-svg-icons";
import '../../styles/shows.css'
import axios from "axios";
import PropTypes from "react";


const Add = (props) => {
    // Props
    const {filmsList, showsData, setShowsData, rooms} = props

    // States
    const [show, setShow] = useState(false)
    const [hourList, setHourList] = useState([])
    const {register, handleSubmit, reset, formState: {errors}} = useForm()
    const [selectedHour, setSelectedHour] = useState("")

    // Form State
    const films = filmsList.sort((a,b) => (a.title > b.title ? 1 : -1))

    // functions
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)



    const addHour = (e) => {
        if (selectedHour==="" || selectedHour === undefined) return;
        if (hourList.length >= 5){
            alert("To many hours (max. 5)")
            return;
        }

        let tempArray = [...hourList]

        let index = tempArray.indexOf(selectedHour)
        if (index!==-1)
            tempArray.splice(index, 1)

        tempArray.push(selectedHour)
        setHourList(tempArray)
    }

    function removeHour(e) {
        let tempArray = [...hourList]
        const index = tempArray.indexOf(e.target.id)
        if (index==null) return
        tempArray.splice(index, 1)
        setHourList(tempArray)
    }

    function createId(){
        let id = 1;
        //póki jest id , inkrementuj id
        while(showsData.find(e => parseInt(e.id) === id) !== undefined){
            id++
        }
        //zwróć pierwsze nienapotkane id
        return id
    }

    const onSubmit = data => {
        data.hours = hourList
        data.soldTickets = {}
        for (const hour of hourList)
            data.soldTickets[hour] = 0;

        data.showId = createId()

        axios.post(`http://localhost:7777/show`, data)
            .then((response) => {
                let tempList = [...showsData]
                tempList.push(data)
                setShowsData(tempList)
            })
            .catch((error) => {
                console.log("Error while editing the data: "+error)
            });
        handleClose()
    };

    return (
        <>
            {/*<FontAwesomeIcon icon={["fal", "coffee"]} />*/}
            <Button className={"addShowButton"} onClick={handleShow}>
                <FAI id="addIcon" icon={faPlusSquare} size={"3x"}/>
            </Button>
            <Modal show={show} onHide={handleClose} className={"addModal"}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Show</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <InputGroup>
                                    <input type={"date"}
                                           defaultValue={new Date(Date.now()).toISOString().substr(0,10)}
                                           className={"dateInputShow"}
                                           {...register('date')}
                                    />
                                </InputGroup>

                            </Row>
                            <Row className={"selectGroup"}>
                                <Col lg={6}>
                                    <InputGroup className={'input-group-edit'}>
                                        <FloatingLabel controlId="floatingSelect" label="Choose Rooms">
                                            <Form.Select className={"showSelect"} {...register('roomId')}>
                                                {rooms.map((room, i) => {
                                                    return (
                                                        <option key={i} value={room.roomId}>{room.roomId}: {room.capacity}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </InputGroup>
                                </Col>
                                <Col lg={6}>
                                    <InputGroup className={'input-group-edit'}>
                                        <FloatingLabel controlId="floatingSelect" label="Choose Films">
                                            <Form.Select className={"showSelect"} {...register("filmId")}>
                                                {films.map((film, i) => {
                                                    return (
                                                        <option key={i} value={film.filmId}>{film.title}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <input  className={"timeInput"}
                                            type={"time"}
                                            // defaultValue={new Date(Date.now()).toISOString().substr(11,5)}
                                            // defaultValue={new Date(Date.now()).toLocaleTimeString().substr(0,5)}
                                            onChange={(e) => {
                                                    setSelectedHour(e.target.value)
                                            }}/>
                                </Col>
                                <Col>
                                    <Button className={"addHourButton"} onClick={(e) => addHour(e)}>
                                        <FAI className={"addIcon"} icon={faArrowAltCircleRight}/>
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ListGroup className={"hoursContainer"} horizontal>
                                        {hourList.map((hour, index) => {
                                            return (

                                                <ListGroupItem key={index} className={"hourItem"}>
                                                    <Badge className={"selectedHourBadge"} onClick={(e) => removeHour(e)}>{hour}</Badge>
                                                    <Button id={hour} variant={"danger"} className={"removeHourButton"} onClick={removeHour}>X</Button>
                                                </ListGroupItem>


                                            )
                                        })}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Container>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type={"submit"}>
                            <FAI icon={faSave}/>
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>

    );
};

Add.propTypes = {
    filmList: PropTypes.array.isRequired,
    showsData: PropTypes.object.isRequired,
    setShowsData: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired
}

export default Add;


