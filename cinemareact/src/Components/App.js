import React from 'react';
import {Button, Stack} from "react-bootstrap";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Films from "./Films/Films";
import TopNavbar from "./TopNavbar";

const App = () => {
    return (

        <BrowserRouter>
            <TopNavbar></TopNavbar>
            <Switch>
                <Route exact path={"/"} />
                <Route path={"/repertuar"}/>
                <Route path={"/cennik"} />
                <Route path={"/films"} component={Films}>
                </Route>
                <Route path={"/ticket/:film_id/:time/:kino"}/>
            </Switch>
        </BrowserRouter>

    );
};

export default App;