import React, {useEffect, useState} from 'react';
import fs from 'fs'
import axios from 'axios'
import {Carousel} from "react-bootstrap";
import '../../styles/films/films.css'






const Films = () => {


    const [imgs, setImgs] = useState([]);



    useEffect(() => {


        const fetchData = async(tempImgs) => {
            const url = process.env.REACT_APP_IMDB_URL
            const api_key = process.env.REACT_APP_IMDB_API_KEY
            const ids = [
                "tt0111161",
                "tt0068646",
                "tt0071562",
                "tt0468569",
                "tt0050083"
            ]
            const configs = ids.map(v => {
                return {
                    method: 'get',
                    url: `${url}/Title/${api_key}/${v}/images`,
                    headers: { }
                }
            })
            try {
                const tempImgs = []
                for (const config of configs){
                    const response = await axios(config)
                    tempImgs.push(response["data"]["image"])
                }
                setImgs(tempImgs)
            } catch (err) {
                console.log("error fetching img data", err)
            }
        }

        fetchData()
    }, [])





    return (
        <div className={"films"}>
            <Carousel variant="dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={imgs[0]}
                    />
                    <Carousel.Caption>
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={imgs[1]}
                    />
                    <Carousel.Caption>
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={imgs[2]}
                    />
                    <Carousel.Caption>
                        <h5>Third slide label</h5>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Films;