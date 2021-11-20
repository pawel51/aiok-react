import React, {useEffect, useState} from 'react';
import {Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import axios from "axios";

const Details = (props) => {
    const [data, setData] = useState([{title:"",year:"",runtimeStr:"",awards:"",directors:"",writers:"",stars:""}])

    useEffect(() => {
        const fetchData = async() => {
            const ids = [
                props.filmId
            ]
            //todo config na facjaty aktorów, zdjęcia

            const configs = ids.map((v,i) => {
                return {
                    method: 'get',
                    url: `http://localhost:7777/film/${v}/details`,
                    headers: { }
                }
            })
            try {
                const tempData = []
                for (const config of configs){
                    const response = await axios(config)
                    tempData.push(response["data"])
                }
                setData(tempData)
            } catch (err) {
                console.log("error fetching details data", err)
            }
        }
        fetchData()
    }, [])

    return (
        <Container className={"detailsContainer"}>
            <Row>
                <Col>
                    <Image className={"detailsImage"} src={data[0].image} />
                </Col>
                <Col>
                {/*    info     */}
                    <ListGroup variant="flush">
                        <ListGroup.Item>TITLE:      {data[0].title}</ListGroup.Item>
                        <ListGroup.Item>ACTORS:     {data[0].year}</ListGroup.Item>
                        <ListGroup.Item>RUNTIME:    {data[0].runtimeStr}</ListGroup.Item>
                        <ListGroup.Item>AWARDS:     {data[0].awards}</ListGroup.Item>
                        <ListGroup.Item>DIRECTORS:  {data[0].directors}</ListGroup.Item>
                        <ListGroup.Item>WRITERS:    {data[0].writers}</ListGroup.Item>
                        <ListGroup.Item>STARS:      {data[0].stars}</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                {data.plotLocal}
            </Row>
            <Row></Row>
        </Container>
    );
};

export default Details;