import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup, Modal, Row} from "react-bootstrap";
import { useForm } from 'react-hook-form';
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import {faEdit, faPlusSquare, faSave} from "@fortawesome/free-regular-svg-icons";
import '../../styles/films/films.css'
import axios from "axios";


const Add = (props) => {
    const [show, setShow] = useState(false)

    const {register, handleSubmit, reset, formState: {errors}} = useForm()


    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const onSubmit = data => {
        axios.post(`http://localhost:7777/film`, data)
            .then((response) => {
                props.updateFilms(response.data)
            })
            .catch((error) => {
                console.log("Error while editing the data: "+error)
            });
        handleClose()
    };

    return (
        <>
            {/*<FontAwesomeIcon icon={["fal", "coffee"]} />*/}
            <Button className={"addFilmButton"} onClick={handleShow}>
                <FAI id="addIcon" icon={faPlusSquare} size={"3x"}/>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Title</InputGroup.Text>
                            <input type={"text"} id={"Name"}
                                   {...register('title')}
                                   className={`form-control ${errors.title ? 'is-invalid' : ''}`}/>
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Release</InputGroup.Text>
                            <input type={"date"} id={"Release"}
                                   value={Date.now()}
                                   {...register('release')}
                                   className={`form-control ${errors.release ? 'is-invalid' : ''}`}/>
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Runtime</InputGroup.Text>
                            <input type={"text"} id={"RuntimeSts"}
                                   {...register('runtimeStr')}
                                   className={`form-control ${errors.title ? 'is-invalid' : ''}`}/>
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Awards</InputGroup.Text>
                            <input type={"text"} id={"Awards"}
                                   {...register('awards')}
                                   className={`form-control ${errors.title ? 'is-invalid' : ''}`}/>
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Directors</InputGroup.Text>
                            <input type={"text"} id={"Directors"}
                                   {...register('directors')}
                                   className={`form-control ${errors.title ? 'is-invalid' : ''}`}/>
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Writers</InputGroup.Text>
                            <input type={"text"} id={"Writers"}
                                   {...register('writers')}
                                   className={`form-control ${errors.title ? 'is-invalid' : ''}`}/>
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Stars</InputGroup.Text>
                            <input type={"text"} id={"Writers"}
                                   {...register('stars')}
                                   className={`form-control ${errors.title ? 'is-invalid' : ''}`}/>
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Rating</InputGroup.Text>
                            <input type={"text"} id={"Rating"}
                                   {...register('imDbRating')}
                                   className={`form-control ${errors.title ? 'is-invalid' : ''}`}/>
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">smallImage</InputGroup.Text>
                            <input type={"text"} id={"smallImage"}
                                   {...register('smallImage')}
                                   className={`form-control ${errors.title ? 'is-invalid' : ''}`}/>
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">image</InputGroup.Text>
                            <input type={"text"} id={"image"}
                                   {...register('image')}
                                   className={`form-control ${errors.title ? 'is-invalid' : ''}`}/>
                        </InputGroup>
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

export default Add;