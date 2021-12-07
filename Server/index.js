import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import FilmsService from "./Services/FilmsService.js";
import ShowsService from "./Services/ShowsService.js";
import RoomsService from "./Services/RoomsService.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const filmService = new FilmsService(app)
const showsService = new ShowsService(app)
const roomsService = new RoomsService(app)





app.listen(7777, () => console.log("Server address http://localhost:7777"));