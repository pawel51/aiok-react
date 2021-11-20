import React from 'react';
import {Button, Stack} from "react-bootstrap";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Films from "./Films/Films";
import TopNavbar from "./TopNavbar";
import Details from "./Films/Details";

const App = () => {
    return (

        <BrowserRouter>
            <TopNavbar></TopNavbar>
            <Switch>
                <Route exact path={"/"} />
                {/*<Route path={"/repertuar"}/>*/}
                {/*<Route path={"/cennik"} />*/}
                <Route exact path={"/films"} component={Films}>
                </Route>
                <Route exact path={"/films/:id/details"} render={({match}) => {
                    return <Details filmId={match.params.id}/>
                }}>
                </Route>
            </Switch>
        </BrowserRouter>

    )
}

export default App;