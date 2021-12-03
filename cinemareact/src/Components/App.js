import React from 'react';
import {Button, Stack} from "react-bootstrap";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Films from "./Films/Films";
import TopNavbar from "./TopNavbar";
import Details from "./Films/Details";
import Edit from "./Films/Edit";
import Shows from "./Shows/Shows";
import Tickets from "./Shows/Tickets";

const App = () => {
    return (

        <BrowserRouter>
            <TopNavbar></TopNavbar>
            <Switch>
                <Route exact path={"/"} />
                <Route exact path={"/shows"} component={Shows}/>
                {/*<Route path={"/cennik"} />*/}
                <Route exact path={"/films"} component={Films}>
                </Route>
                <Route exact path={"/films/:id/details"} render={({match}) => {
                    return <Details filmId={match.params.id}/>
                }}>
                </Route>
                <Route exact path={"/shows/tickets/:filmId/:showId/:hourId"} render={({match}) => {
                    //podstaw tu nazwę swojego komponentu z kupowaniem biletów
                    return <Tickets filmId={match.params.filmId}
                                    showId={match.params.showId}
                                    hourId={match.params.hourId}/>
                }}/>
            </Switch>
            {/*<Shows></Shows>*/}
        </BrowserRouter>

    )
}

export default App;