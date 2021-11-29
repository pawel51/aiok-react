import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import '../../styles/films/films.css'
import FilmCard from "./FilmCard";
import {Link} from "react-router-dom";
import {faCaretSquareLeft, faCaretSquareRight} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import Add from "./Add";



const Films = () => {


    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0)
    const [isLoaded, setLoaded] = useState(false)
    const move = 200;


    useEffect(() => {
        const fetchData = async() => {

            const config = {
                method: "get",
                url: "http://localhost:7777/films",
                headers: { }
            }
            try {
                const tempData = []

                const response = await axios(config)
                tempData.push(...response["data"])
                setData(tempData)
            } catch (err) {
                console.log("error fetching img data", err)
            }
        }
        fetchData()
            .then(() => setLoaded(true))
    }, [])


    const moveRight = () => {
        setOffset(offset-move)
    }
    const moveLeft = () => {
        setOffset(offset+move)
    }
    useEffect(() => {
        document.querySelectorAll(".linkTo").forEach(link => {
            link.setAttribute("style", `transform:translateX(${offset}px);`)
        })
    }, [offset])

    const updateFilmAfterAdd = (film) => {
        let tempFilms = [...data]
        tempFilms.push(film)
        setData(tempFilms)
    }


    return (
        <Container>
            <Row>
                <Col className={"leftCont"} lg={1} md={1} sm={2} xs={1}>
                    <Button className={"leftButton"} onClick={moveLeft}>
                        <FAI icon={faCaretSquareLeft}/>
                    </Button>
                </Col>
                <Col lg={10} md={10} sm={8} xs={9}>
                    <Container>
                        <Row className={"filmContainer"}>
                            {data.map((film, index) => {
                                return (
                                    <Link className={"linkTo"} to={`/films/${film["filmId"]}/details`}>
                                        <FilmCard key={film.filmId} data={film}/>
                                    </Link>
                                )
                            })}
                        </Row>
                    </Container>
                </Col>
                <Col className={"rightCont"} lg={1} md={1} sm={2} xs={1}>
                    <Button className={"rightButton"} onClick={moveRight}>
                        <FAI icon={faCaretSquareRight}/>
                    </Button>
                </Col>


            </Row>
            <Add data={data} updateFilms={updateFilmAfterAdd}/>
        </Container>


    );
};

export default Films;