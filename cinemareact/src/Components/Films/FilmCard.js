import React from 'react';
import {Badge, Button, Card} from "react-bootstrap";
import '../../styles/films.css'

const FilmCard = (props) => {
    const film = props.data
    return (
        <Card className={"singleCard"}>
            <Card.Img className={"cardImg"} variant="top" src={film["smallImage"]} />
            <Card.Body>
                <Card.Text>
                    <Badge bg="warning" text="dark">
                        {film["imDbRating"]}
                    </Badge>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default FilmCard;