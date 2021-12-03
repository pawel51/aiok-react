import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import axios from "axios";
import Edit from "./Edit";
import Delete from "./Delete";

const Details = (props) => {
    const filmId = props.filmId

    const [data, setData] = useState([{
        title: "",
        releaseDate: "",
        runtimeStr: "",
        awards: "",
        directors: "",
        writers: "",
        stars: "",
        image: "",
        smallImage: "",
        plot: ""
    }])
    const [isLoaded, setLoaded] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            const ids = [
                props.filmId
            ]
            const configs = ids.map((v, i) => {
                return {
                    method: 'get',
                    url: `http://localhost:7777/film/${v}/details`,
                    headers: {}
                }
            })
            try {
                const tempData = []
                for (const config of configs) {
                    const response = await axios(config)
                    tempData.push(response["data"])
                }
                setData(tempData)
            } catch (err) {
                console.log("error fetching details data", err)
            }
        }
        fetchData()
            .then(() => setLoaded(true))
    }, [])

    return (
        <Container className={"detailsContainer"}>
            <Row>
                <Col xl={4} lg={5} md={5} sm={7}>
                    <Image className={"detailsImage"} src={data[0].image}/>
                </Col>
                <Col lg={4} md={8} sm={12}>
                    {/*    info     */}

                    <ListGroup variant="flush">
                        <ListGroup.Item className={"listGroupItem"}>TITLE: {data[0].title}</ListGroup.Item>
                        <ListGroup.Item className={"listGroupItem"}>RELEASE: {data[0].releaseDate}</ListGroup.Item>
                        <ListGroup.Item className={"listGroupItem"}>RUNTIME: {data[0].runtimeStr}</ListGroup.Item>
                        <ListGroup.Item className={"listGroupItem"}>AWARDS: {data[0].awards}</ListGroup.Item>
                        <ListGroup.Item className={"listGroupItem"}>DIRECTORS: {data[0].directors}</ListGroup.Item>
                        <ListGroup.Item className={"listGroupItem"}>WRITERS: {data[0].writers}</ListGroup.Item>
                        <ListGroup.Item className={"listGroupItem"}>STARS: {data[0].stars}</ListGroup.Item>
                    </ListGroup>


                    <div className={"buttonCont"}>
                        {isLoaded ? <Delete data={data[0]} filmId={data[0].filmId} title={data[0].title}
                                            setData={setData}/> : null}

                        {isLoaded ? <Edit data={data[0]} setData={setData}/> : null}
                    </div>


                </Col>
            </Row>
            <Row className={"plotBox"}>
                <p className={"plot"}>{data[0].plot}</p>
            </Row>
            <Row></Row>
        </Container>
    );
};

export default Details;

