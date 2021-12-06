import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import {faTrashCan, faXmarkCircle} from "@fortawesome/free-regular-svg-icons";
import '../../styles/films.css'
import axios from "axios";
import {Link} from 'react-router-dom'
import PropTypes from "react";


const Delete = (props) => {
    const {showId, showsData, setShowsData, showTitle} = props

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)

    const handleClose = () => setShow(false)

    const onSubmit = () => {
        axios.delete(`http://localhost:7777/show/${showId}`)
            .then((response) => {
                let index = showsData.indexOf(showsData.find(el => el.showId === showId))
                if (index === - 1 || index == null) return
                let tempArray = [...showsData]
                tempArray.splice(index, 1)
                setShowsData(tempArray)
            })
            .catch((error) => {
                console.log("Error while deleting the show with id:"+showId+"  :"+error)
                alert("Cant delete show from database")
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
                    Are you sure, you want to delete show {showTitle} ?
                </Modal.Body>
                <Modal.Footer>
                    <Link to={"/"}>
                        <Button variant={"primary"} onClick={onSubmit}>
                            <FAI icon={faTrashCan}/>
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );
};

Delete.propTypes = {
    showId: PropTypes.string.isRequired,
    showsData: PropTypes.object.isRequired,
    setShowsData: PropTypes.func.isRequired,
    showTitle: PropTypes.string.isRequired
}

export default Delete;