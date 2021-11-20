import React, {useEffect, useState} from 'react';
import fs from 'fs'
import axios from 'axios'
import {Carousel, Col, Container, Image, Row} from "react-bootstrap";
import '../../styles/films/films.css'
import FilmCard from "./FilmCard";
import {Link} from "react-router-dom";






const Films = () => {


    const [data, setImgs] = useState([]);



    useEffect(() => {
        const fetchData = async() => {
            const ids = [
                "0","1","2","3","4","5","6","7","8"
            ]
            const configs = ids.map((v,i) => {
                return {
                    method: 'get',
                    url: `http://localhost:7777/film/${i}`,
                    headers: { }
                }
            })
            try {
                const tempImgs = []
                for (const config of configs){
                    const response = await axios(config)
                    tempImgs.push(response["data"])
                }
                setImgs(tempImgs)
            } catch (err) {
                console.log("error fetching img data", err)
            }
        }
        fetchData()
    }, [])





    return (
        <Container>
            <Row className={"filmContainer"}>
                {data.map((film) => {
                    return (
                        <Link className={"linkTo"} to={`/films/${film["filmId"]}/details`}>
                            <FilmCard key={film.id} data={film}/>
                        </Link>
                        )
                })}
            </Row>
        </Container>
    );
};

export default Films;