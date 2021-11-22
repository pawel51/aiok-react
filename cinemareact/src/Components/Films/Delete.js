import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup, Modal, Row} from "react-bootstrap";
import { useForm } from 'react-hook-form';
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faTrashCan, faXmarkCircle} from "@fortawesome/free-regular-svg-icons";
import '../../styles/films/films.css'
import axios from "axios";
import {Link, Redirect} from 'react-router-dom'


const Delete = (props) => {
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)

    const handleClose = () => setShow(false)

    const onSubmit = () => {
        axios.delete(`http://localhost:7777/film/${props.filmId}`)
            .then((response) => {
                //todo ustawic stan komponentu Films reduxem ( z tego miejsca nie ma referencji )
            })
            .catch((error) => {
                console.log("Error while deleting the data: "+error)
            });
        handleClose()
    };

    return (
        <>
            {/*<FontAwesomeIcon icon={["fal", "coffee"]} />*/}
            <Button className={"delButton"} onClick={handleShow}>
                <FAI id="delIcon" icon={faXmarkCircle} />
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Permanent Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure, you want to delete movie {props.title} ?
                </Modal.Body>
                <Modal.Footer>
                    <Link to={"/films"}>
                        <Button variant={"primary"} onClick={onSubmit}>
                            <FAI icon={faTrashCan}/>
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>

    );
};

export default Delete;