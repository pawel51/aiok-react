import React, {useEffect, useState} from 'react';
import fs from 'fs'
import axios from 'axios'
import {Carousel, Button, Col, Container, Image, Row} from "react-bootstrap";
import '../../styles/films/films.css'
import FilmCard from "./FilmCard";
import {Link} from "react-router-dom";
import {faCaretSquareLeft, faCaretSquareRight} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";



const Films = () => {


    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0)
    const move = 200;

    useEffect(() => {
        const fetchData = async() => {
            const ids = [
                "0","1","2","3","4","5","6","7","8"
            ]
            // const configs = ids.map((v,i) => {
            //     return {
            //         method: 'get',
            //         url: `http://localhost:7777/film/${i+1}`,
            //         headers: { }
            //     }
            // })
            const config = {
                method: "get",
                url: "http://localhost:7777/films",
                headers: { }
            }
            try {
                const tempData = []
                // for (const config of configs){
                //     const response = await axios(config)
                //     tempImgs.push(response["data"])
                // }
                const response = await axios(config)
                tempData.push(...response["data"])
                setData(tempData)
            } catch (err) {
                console.log("error fetching img data", err)
            }
        }
        fetchData()
    }, [])


    const moveLeft = () => {
        setOffset(offset-move)
    }
    const moveRight = () => {
        setOffset(offset+move)
    }
    useEffect(() => {
        document.querySelectorAll(".linkTo").forEach(link => {
            link.setAttribute("style", `transform:translateX(${offset}px);`)
        })
    }, [offset])


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
        </Container>


    );
};

export default Films;