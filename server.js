const express = require('express');
const path = require('path');
const fs = require('fs');
const data = require('./db/db');


const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/newNotes', (req, res) => res.json(newNotes));

app.route('/api/notes')
.get(function (req, res){
    res.json(data);
})

.post(function (req, res){
    let jsonFile = path.join(__dirname, "/db/db.json");
    let newNotes = req.body;

    let highestID = 99;

    for(i=0; i < data.length; i++){
        let personID = data[i];

        if(personID > highestID){
            highestID = personID;
        }
    }
    newNotes.id = highestID +1;

    data.push(newNotes);

    fs.writeFile(jsonFile,JSON.stringify(data), function(err){
            if(err){
                return console.log(err);
            }

            console.log("your note as been saved");
    });
    res.json(newNotes);
});

app.delete('/api/notes', function (req, res){
    let jsonFile = path.join(__dirname,'/db/db.json');

    for(i=0; i < data.length; i++){
        if(data[i].id === req.params.id){
            data.splice(i,1);
            break;
        }
    }
    fs.writeFile(jsonFile,JSON.stringify(data), function(err){
        if(err){
            return console.log(err);
        }

        console.log("your note as been saved");
});
res.json(data);

})
app.listen(PORT, ()=>{
    console.log(`App listening on PORT ${PORT}`);
})