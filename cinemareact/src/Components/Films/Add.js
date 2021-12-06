import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup, Modal, Row} from "react-bootstrap";
import { useForm } from 'react-hook-form';
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import {faEdit, faPlusSquare, faSave} from "@fortawesome/free-regular-svg-icons";
import '../../styles/films.css'
import axios from "axios";
import PropTypes from "react";


const Add = (props) => {

    const {updateFilms, data} = props

    const [show, setShow] = useState(false)

    const {register, handleSubmit, reset, formState: {errors}} = useForm()

    const floatPattern = /[+-]?([0-9]*[.])?[0-9]+/i

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const onSubmit = data => {
        data.filmId = createId();
        axios.post(`http://localhost:7777/film`, data)
            .then((response) => {
                props.updateFilms(response.data)
            })
            .catch((error) => {
                console.log("Error while editing the data: "+error)
            });
        handleClose()
    };

    function createId(){
        let id = 1;
        //póki jest id , inkrementuj id
        while(props.data.find(e => parseInt(e.id) === id) !== undefined){
            id++
        }
        //zwróć pierwsze nienapotkane id
        return id
    }

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
                                   aria-invalid={errors.title ? "true" : "false"}
                                   {...register('title', {required: true, minLength:1, maxLength: 100})}
                                   className={`form-control ${errors.title? 'my-invalid' : ''}`}/>
                            {errors.title && errors.title.type === "required" && (
                                <span className={"spanAlert"} role="alert">This is required!</span>
                            )}
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Release</InputGroup.Text>
                            <input type={"date"} id={"ReleaseDate"}
                                   {...register('releaseDate', {required: true})}
                                   defaultValue={new Date().toISOString().substr(0,10)}
                                   className={`form-control ${errors.releaseDate ? 'my-invalid' : ''}`}/>
                            {errors.releaseDate && errors.releaseDate.type === "required" && (
                                <span className={"spanAlert"} role="alert">This is required!</span>
                            )}
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Runtime</InputGroup.Text>
                            <input type={"text"} id={"RuntimeStr"}
                                   {...register('runtimeStr', {required: true})}
                                   className={`form-control ${errors.runtimeStr ? 'my-invalid' : ''}`}/>
                            {errors.runtimeStr && errors.runtimeStr.type === "required" && (
                                <span className={"spanAlert"} role="alert">This is required!</span>
                            )}
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Awards</InputGroup.Text>
                            <input type={"text"} id={"Awards"}
                                   {...register('awards')}
                                   className={`form-control ${errors.awards ? 'my-invalid' : ''}`}/>
                            {errors.awards && errors.awards.type === "required" && (
                                <span className={"spanAlert"} role="alert">This is required!</span>
                            )}
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Directors</InputGroup.Text>
                            <input type={"text"} id={"Directors"}
                                   {...register('directors', {required: true})}
                                   className={`form-control ${errors.directors ? 'my-invalid' : ''}`}/>
                            {errors.directors && errors.directors.type === "required" && (
                                <span className={"spanAlert"} role="alert">This is required!</span>
                            )}
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Writers</InputGroup.Text>
                            <input type={"text"} id={"Writers"}
                                   {...register('writers', {required: true})}
                                   className={`form-control ${errors.writers ? 'my-invalid' : ''}`}/>
                            {errors.writers && errors.writers.type === "required" && (
                                <span className={"spanAlert"} role="alert">This is required!</span>
                            )}
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Stars</InputGroup.Text>
                            <input type={"text"} id={"Writers"}
                                   {...register('stars', {required: true})}
                                   className={`form-control ${errors.stars ? 'my-invalid' : ''}`}/>
                            {errors.stars && errors.stars.type === "required" && (
                                <span className={"spanAlert"} role="alert">This is required!</span>
                            )}
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">Rating</InputGroup.Text>
                            <input type={"text"} id={"Rating"}
                                   {...register('imDbRating', {required: true, pattern: floatPattern})}
                                   className={`form-control ${errors.imDbRating ? 'my-invalid' : ''}`}/>
                            {errors.imDbRating && errors.imDbRating.type === "required" && (
                                <span className={"spanAlert"} role="alert">This is required!</span>
                            )}
                            {errors.imDbRating && errors.imDbRating.type === "pattern" && (
                                <span className={"spanAlert"} role="alert">This has to be a number!</span>
                            )}
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">smallImage</InputGroup.Text>
                            <input type={"text"} id={"smallImage"}
                                   {...register('smallImage', {required: true})}
                                   className={`form-control ${errors.smallImage ? 'my-invalid' : ''}`}/>
                            {errors.smallImage && errors.smallImage.type === "required" && (
                                <span className={"spanAlert"} role="alert">This is required!</span>
                            )}
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id="inputGroup-sizing-sm">image</InputGroup.Text>
                            <input type={"text"} id={"image"}
                                   {...register('image', {required: true})}
                                   className={`form-control ${errors.image ? 'my-invalid' : ''}`}/>
                            {errors.image && errors.image.type === "required" && (
                                <span className={"spanAlert"} role="alert">This is required!</span>
                            )}
                        </InputGroup>
                        <InputGroup className={'input-group-edit'}>
                            <InputGroup.Text style={{width:"80px"}} id={"inputGroup-sizing-sm"}>plot</InputGroup.Text>
                            <input type={"text"} id={"plot"}
                                   {...register('plot', {required: true, minLength: 100})}
                                   className={`form-control ${errors.image ? 'my-invalid' : ''}`}/>
                            {errors.plot && errors.plot.type === "required" && (
                                <span className={"spanAlert"} role="alert">This is required!</span>
                            )}
                            {errors.plot && errors.plot.type === "minLength" && (
                                <span className={"spanAlert"} role="alert">Plot is too short (>100)!</span>
                            )}
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

Add.propTypes = {
    updateFilms: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

export default Add;

