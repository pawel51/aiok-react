import fs from "fs";

class ShowsService {

    constructor(app) {

        const PATH = './Storage/shows.json'

        const getLastId = (showsJson) => {
            var maxId = 0;
            var shows = JSON.parse(showsJson);
            for (let i = 0; i < shows.length; i++) {
                if (shows[i].showId >= maxId)
                    maxId = shows[i].showId;
            }

            return maxId;
        }

        app.get('/shows', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, showsJson) => {
                if (err) {
                    console.log("File read failed in GET /show"+" : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                console.log("GET: /shows");
                res.send(showsJson);
            });
        });

        app.get('/show/:id/details', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, showsJson) => {
                if (err) {
                    console.log("File read failed in GET /show/" + req.params.id + "/details" + " : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                var shows = JSON.parse(showsJson);
                var show = shows.find(showtmp => showtmp.showId == req.params.id);
                if (!show) {
                    console.log("Can't find show with id: " + req.params.id);
                    res.status(500).send('Cant find show with id: ' + req.params.id);
                    return;
                }
                var showJSON = JSON.stringify(show);
                console.log("GET /shows/"  + req.params.id + "/details");
                res.send(showJSON);
            });
        });

        app.get('/show/:id', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, showsJson) => {
                if (err) {
                    console.log("File read failed in GET /show/" + req.params.id + " : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                var shows = JSON.parse(showsJson);
                var show = shows.find(showtmp => showtmp.showId == req.params.id);
                if (!show) {
                    console.log("Can't find show with id: " + req.params.id);
                    res.status(500).send('Cant find show with id: ' + req.params.id);
                    return;
                }
                var showJSON = JSON.stringify(show);
                console.log("GET /shows/" + req.params.id);
                res.send(showJSON);
            });
        });




        app.get('/date/:date', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, showsJson) => {
                if (err) {
                    console.log("File read failed in GET /show/" + req.params.date + " : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                var shows = JSON.parse(showsJson);
                var show = shows.filter(showtmp => showtmp.date == req.params.date);
                if (!show) {
                    console.log("Can't find show with id: " + req.params.id);
                    res.status(500).send('Cant find show with id: ' + req.params.date);
                    return;
                }
                var showJSON = JSON.stringify(show);
                console.log("GET /shows/" + req.params.date);
                res.send(showJSON);
            });
        });

        app.post('/show', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, showsJson) => {
                if (err) {
                    console.log("File read failed in POST /show"+" : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                var shows = JSON.parse(showsJson);
                var id = getLastId(showsJson);
                id = parseInt(id) + 1;
                if (id) {
                    req.body.showId = id.toString();
                    shows.push(req.body);
                    var newList = JSON.stringify(shows);
                    fs.writeFile(PATH, newList, err => {
                        if (err) {
                            console.log('Error writing file in POST /show', err);
                            res.status(500).send('Error writing file shows.json');
                        } else {
                            res.status(201).send(req.body);
                            console.log('Successfully wrote file shows.json and added new show with id = ' + req.body.showId);
                        }
                    });
                } else {
                    console.log("File read failed in POST /show", err);
                    res.status(500).send('File read failed');
                    return;
                }
            });
        });

        app.put('/show/:id', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, showsJson) => {
                if (err) {
                    console.log("File read failed in PUT /show/" + req.params.id+" : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                var shows = JSON.parse(showsJson);
                var showBody = shows.find(showtmp => showtmp.showId == req.body.showId);
                if (showBody && showBody.showId != req.params.id) {
                    console.log("show by id = " + showBody.showId + " already exists");
                    res.status(500).send('show by id = ' + showBody.showId + ' already exists');
                    return;
                }
                var show = shows.find(showtmp => showtmp.showId == req.params.id);
                var id = getLastId(showsJson);

                if (!show) {
                    id = id + 1;
                    req.body.showId = id;
                    shows.push(req.body);
                    var newList = JSON.stringify(shows);
                    fs.writeFile(PATH, newList, err => {
                        if (err) {
                            console.log('Error writing file in PUT /show/' + req.params.id+" : "+ err);
                            res.status(500).send('Error writing file shows.json');
                        } else {
                            res.status(201).send(req.body);
                            console.log('Successfully wrote file shows.json and added new show with id = ' + req.body.showId);
                        }
                    });
                } else {
                    for (var i = 0; i < shows.length; i++) {
                        if (shows[i].showId == show.showId) {
                            shows[i] = req.body;
                        }
                    }
                    var newList = JSON.stringify(shows);
                    fs.writeFile(PATH, newList, err => {
                        if (err) {
                            console.log('Error writing file in PUT /show/' + req.params.id, err);
                            res.status(500).send('Error writing file shows.json');
                        } else {
                            res.status(200).send(req.body);
                            console.log('Successfully wrote file shows.json and edit show with old id = ' + req.params.id);
                        }
                    });
                }
            });
        });

        app.delete('/show/:id', (req, res) => {
            fs.readFile(PATH, 'utf8', (err, showsJson) => {
                if (err) {
                    console.log("File read failed in DELETE /show" +" : "+ err);
                    res.status(500).send('File read failed');
                    return;
                }
                var shows = JSON.parse(showsJson);
                var showIndex = shows.findIndex(showtmp => showtmp.showId == req.params.id);

                if (showIndex != -1) {
                    shows.splice(showIndex, 1);
                    var newList = JSON.stringify(shows);

                    fs.writeFile(PATH, newList, err => {
                        if (err) {
                            console.log('Error writing file in DELETE /show/' + req.params.id, err);
                            res.status(500).send('Error writing file shows.json');
                        } else {
                            res.status(204).send();
                            console.log('Successfully deleted show with id = ' + req.params.id);
                        }
                    });
                } else {
                    console.log("show by id = " + req.params.id + " does not exists");
                    res.status(500).send('show by id = ' + req.params.id + ' does not exists');
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

export default ShowsService