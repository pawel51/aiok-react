import fs from "fs";

class roomsService {

    constructor(app) {

        const PATH = './Storage/rooms.json'

        const getLastId = (roomsJson) => {
            var maxId = 0;
            var rooms = JSON.parse(roomsJson);
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].roomId >= maxId)
                    maxId = rooms[i].roomId;
            }

            return maxId;
        }

        app.get('/rooms', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, roomsJson) => {
                if (err) {
                    console.log("File read failed in GET /room"+" : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                console.log("GET: /rooms");
                res.send(roomsJson);
            });
        });

        app.get('/room/:id/details', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, roomsJson) => {
                if (err) {
                    console.log("File read failed in GET /room/" + req.params.id + "/details" + " : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                var rooms = JSON.parse(roomsJson);
                var room = rooms.find(roomtmp => roomtmp.roomId == req.params.id);
                if (!room) {
                    console.log("Can't find room with id: " + req.params.id);
                    res.status(500).send('Cant find room with id: ' + req.params.id);
                    return;
                }
                var roomJSON = JSON.stringify(room);
                console.log("GET /rooms/"  + req.params.id + "/details");
                res.send(roomJSON);
            });
        });

        app.get('/room/:id', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, roomsJson) => {
                if (err) {
                    console.log("File read failed in GET /room/" + req.params.id + " : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                var rooms = JSON.parse(roomsJson);
                var room = rooms.find(roomtmp => roomtmp.roomId == req.params.id);
                if (!room) {
                    console.log("Can't find room with id: " + req.params.id);
                    res.status(500).send('Cant find room with id: ' + req.params.id);
                    return;
                }
                var roomJSON = JSON.stringify(room);
                console.log("GET /rooms/" + req.params.id);
                res.send(roomJSON);
            });
        });




        app.get('/date/:date', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, roomsJson) => {
                if (err) {
                    console.log("File read failed in GET /room/" + req.params.date + " : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                var rooms = JSON.parse(roomsJson);
                var room = rooms.filter(roomtmp => roomtmp.date == req.params.date);
                if (!room) {
                    console.log("Can't find room with id: " + req.params.id);
                    res.status(500).send('Cant find room with id: ' + req.params.date);
                    return;
                }
                var roomJSON = JSON.stringify(room);
                console.log("GET /rooms/" + req.params.date);
                res.send(roomJSON);
            });
        });

        app.post('/room', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, roomsJson) => {
                if (err) {
                    console.log("File read failed in POST /room"+" : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                var rooms = JSON.parse(roomsJson);
                var id = getLastId(roomsJson);
                id = parseInt(id) + 1;
                if (id) {
                    req.body.roomId = id.toString();
                    rooms.push(req.body);
                    var newList = JSON.stringify(rooms);
                    fs.writeFile(PATH, newList, err => {
                        if (err) {
                            console.log('Error writing file in POST /room', err);
                            res.status(500).send('Error writing file rooms.json');
                        } else {
                            res.status(201).send(req.body);
                            console.log('Successfully wrote file rooms.json and added new room with id = ' + req.body.roomId);
                        }
                    });
                } else {
                    console.log("File read failed in POST /room", err);
                    res.status(500).send('File read failed');
                    return;
                }
            });
        });

        app.put('/room/:id', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, roomsJson) => {
                if (err) {
                    console.log("File read failed in PUT /room/" + req.params.id+" : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                var rooms = JSON.parse(roomsJson);
                var roomBody = rooms.find(roomtmp => roomtmp.roomId == req.body.roomId);
                if (roomBody && roomBody.roomId != req.params.id) {
                    console.log("room by id = " + roomBody.roomId + " already exists");
                    res.status(500).send('room by id = ' + roomBody.roomId + ' already exists');
                    return;
                }
                var room = rooms.find(roomtmp => roomtmp.roomId == req.params.id);
                var id = getLastId(roomsJson);

                if (!room) {
                    id = id + 1;
                    req.body.roomId = id;
                    rooms.push(req.body);
                    var newList = JSON.stringify(rooms);
                    fs.writeFile(PATH, newList, err => {
                        if (err) {
                            console.log('Error writing file in PUT /room/' + req.params.id+" : "+ err);
                            res.status(500).send('Error writing file rooms.json');
                        } else {
                            res.status(201).send(req.body);
                            console.log('Successfully wrote file rooms.json and added new room with id = ' + req.body.roomId);
                        }
                    });
                } else {
                    for (var i = 0; i < rooms.length; i++) {
                        if (rooms[i].roomId == room.roomId) {
                            rooms[i] = req.body;
                        }
                    }
                    var newList = JSON.stringify(rooms);
                    fs.writeFile(PATH, newList, err => {
                        if (err) {
                            console.log('Error writing file in PUT /room/' + req.params.id, err);
                            res.status(500).send('Error writing file rooms.json');
                        } else {
                            res.status(200).send(req.body);
                            console.log('Successfully wrote file rooms.json and edit room with old id = ' + req.params.id);
                        }
                    });
                }
            });
        });

        app.delete('/room/:id', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, roomsJson) => {
                if (err) {
                    console.log("File read failed in DELETE /room" +" : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                var rooms = JSON.parse(roomsJson);
                var roomIndex = rooms.findIndex(roomtmp => roomtmp.roomId == req.params.id);

                if (roomIndex != -1) {
                    rooms.splice(roomIndex, 1);
                    var newList = JSON.stringify(rooms);

                    fs.writeFile(PATH, newList, err => {
                        if (err) {
                            console.log('Error writing file in DELETE /room/' + req.params.id, err);
                            res.status(500).send('Error writing file rooms.json');
                        } else {
                            res.status(204).send();
                            console.log('Successfully deleted room with id = ' + req.params.id);
                        }
                    });
                } else {
                    console.log("room by id = " + req.params.id + " does not exists");
                    res.status(500).send('room by id = ' + req.params.id + ' does not exists');
                    return;
                }
            });
        });
    }

    // add (){
    //
    // }
    //
    // edit (){
    //
    // }
    //
    // delete(){
    //
    // }
    //
    // getAll() {
    //
    // }
    //
    // getDetails(){
    //
    // }
    //
    // getLastId(){
    //
    // }
}

export default roomsService