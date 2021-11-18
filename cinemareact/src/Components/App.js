import React from 'react';
import {Button} from "react-bootstrap";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./TopNavbar";

const App = () => {
    return (

        <BrowserRouter>
            <h1>Cinema</h1>
            <Button variant={"dark"} >Helloworld</Button>
            <Navbar></Navbar>
            <Switch>
                <Route path={"/"} />
                <Route path={"/repertuar"}/>
                <Route path={"/cennik"} />
                <Route path={"/filmy"} />
                <Route path={"/ticket/:film_id/:time/:kino"}/>
            </Switch>
        </BrowserRouter>

    );
};

export default App;