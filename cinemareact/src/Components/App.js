import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Films from "./Films/Films";
import TopNavbar from "./TopNavbar";
import Details from "./Films/Details";
import Shows from "./Shows/Shows";
import Tickets from "./Shows/Tickets";
import CurrentShows from "./Shows/CurrentShows";

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
                <Route exact path={"/running"}>
                    <CurrentShows/>
                </Route>
                <Route exact path={"/films/:id/details"} render={({match}) => {
                    return <Details filmId={match.params.id}/>
                }}>
                </Route>
                <Route exact path={"/show/tickets/:filmId/:showId/:hour/:roomId"} render={({match}) => {
                    //podstaw tu nazwę swojego komponentu z kupowaniem biletów
                    return <Tickets filmId={match.params.filmId}
                                    showId={match.params.showId}
                                    hour={match.params.hour}
                                    roomId={match.params.roomId}/>
                }}/>
            </Switch>
            {/*<Shows></Shows>*/}
        </BrowserRouter>

    )
}

export default App;