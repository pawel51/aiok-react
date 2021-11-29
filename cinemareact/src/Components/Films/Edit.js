import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup, Modal, Row} from "react-bootstrap";
import { useForm } from 'react-hook-form';
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import {faEdit, faSave} from "@fortawesome/free-regular-svg-icons";
import '../../styles/films.css'
import axios from "axios";


const Edit = (props) => {
    const [show, setShow] = useState(false)

    const data = props.data
    const setData = props.setData



    // function parseDateString(originalValue) {
    //     const parsedDate = isDate(originalValue)
    //         ? parse("2021-11-20", "yyyy-MM-dd", new Date())
    //         : parse(originalValue, "yyyy-MM-dd", new Date());
    //
    //     return parsedDate;
    // }

    // const schema = yup.object({
    //     title: yup.string().required().default(data.title),
    //     directors: yup.string().required().default(data.directors),
    //     writers: yup.string().required().default(data.writers),
    //     stars: yup.string().required().default(data.stars),
    //     smallImg: yup.string().required().default(data.smallImage),
    //     image: yup.string().required().default(data.image),
    //     awards: yup.string().default(data.awards),
    //     release: yup.date(),
    //     imDbRating: yup.number().default(isNaN(data.imDbRating)? 1.0 : parseFloat(data.imDbRating)),
    //     runtimeStr: yup.string().default(data.runtimeStr)
    // })

    // const initialValues = schema.cast()

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: data
    })


    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const onSubmit = data => {
        axios.put(`http://localhost:7777/film/${data.filmId}`, data)
            .then((response) => {
                setData([response.data])
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
                <FAI className={"editIcon"} icon={faEdit}/>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit movie</Modal.Title>
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
                                   value={data.releaseDate}
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

export default Edit;