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
import PropTypes from "prop-types";


const Edit = (props) => {
    // Props
    const {showId, showsData, setShowsData, showTitle, hours, rooms} = props

    const editedShow = showsData.find(e => e.showId === showId)

    // States
    const [hidden, setHidden] = useState(true)
    const [hourList, setHourList] = useState(hours)
    const {register, handleSubmit, formState: {errors}} = useForm(
        {defaultValues: editedShow}
    )
    const [selectedHour, setSelectedHour] = useState("")



    // Form State
    // const films = filmsData.sort((a,b) => (a.title > b.title ? 1 : -1))


    // functions
    const handleShow = () => setHidden(false)
    const handleClose = () => {
        setHourList(hours)
        setHidden(true)
    }





    const addHour = (e) => {
        if (selectedHour==="" || selectedHour === undefined) return;
        if (hourList.length >= 5){
            alert("To many hours (max. 5)")
            return;
        }
        let tempList = [...hourList]
        let index = tempList.indexOf(selectedHour)
        if (index!==-1) return
        tempList.push(selectedHour)
        setHourList(tempList)
    }

    function removeHour(e) {
        let tempList = [...hourList]
        const index = tempList.indexOf(e.target.id)
        if (index===-1) return
        tempList.splice(index, 1)
        setHourList(tempList)
    }

    const onSubmit = data => {
        data.hours = hourList
        axios.put(`http://localhost:7777/show/${showId}`, data)
            .then((response) => {
                let tempList = [...showsData]
                let index = showsData.indexOf(editedShow)
                tempList.splice(index, 1)
                tempList.push(data)
                setShowsData(tempList)
                console.log("Saved")
            })
            .catch((error) => {
                console.log("Error while editing the data: "+error)
            });
        handleClose()
    };

    return (
        <>
            {/*<FontAwesomeIcon icon={["fal", "coffee"]} />*/}
            <Button className={"editButton"} onClick={handleShow}>
                <FAI className="editIcon" icon={faEdit}/>
            </Button>
            <Modal show={!hidden} onHide={handleClose} className={"addModal"}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Show "{showTitle}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <InputGroup>
                                    <input type={"date"}
                                           {...register('date')}
                                           className={"dateInputShow"}/>
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
                                {/*<Col lg={6}>*/}
                                {/*    <InputGroup className={'input-group-edit'}>*/}
                                {/*        <FloatingLabel controlId="floatingSelect" label="Choose Films">*/}
                                {/*            <Form.Select className={"showSelect"} {...register("filmId")} defaultValue={editedShow.filmId}>*/}
                                {/*                {films.map((film, i) => {*/}
                                {/*                    return (*/}
                                {/*                        <option key={i} value={film.filmId}>{film.title}</option>*/}
                                {/*                    )*/}
                                {/*                })}*/}
                                {/*            </Form.Select>*/}
                                {/*        </FloatingLabel>*/}
                                {/*    </InputGroup>*/}
                                {/*</Col>*/}
                            </Row>
                            <Row>
                                <Col>
                                    <input  className={"timeInput"}
                                            type={"time"}
                                        // defaultValue={new Date(Date.now()).toLocaleTimeString().substr(0,5)}
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
                                        {hourList.sort((a,b) => a > b ? 1 : -1).map((hour, i) => {
                                            return (

                                                <ListGroupItem key={i} className={"hourItem"}>
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

Edit.propTypes = {
    showId: PropTypes.string.isRequired,
    showsData: PropTypes.object.isRequired,
    setShowsData: PropTypes.func.isRequired,
    showTitle: PropTypes.func.isRequired,
    hours: PropTypes.arrayOf(PropTypes.string).isRequired,
    rooms: PropTypes.array.isRequired
}

export default Edit;