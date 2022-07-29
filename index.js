import express from 'express';
import fs from 'fs';
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send(`Hey!!!
  Please enter endpoint "/create-file" to create a new file.
  Please enter endpoint "/show-files" to view files in the folder.`)
})

const timestamp = Date.now();
const dateObject = new Date(timestamp);
const month = (`0${dateObject.getMonth() + 1}`).slice(-2);
const date = (`0${dateObject.getDate()}`).slice(-2);
const hours = (`0${dateObject.getHours()}`).slice(-2);
const mins = (`0${dateObject.getMinutes()}`).slice(-2);
const secs = (`0${dateObject.getSeconds()}`).slice(-2);
const data = `${hours}:${mins}:${secs}`;
const fileName = `${dateObject.getFullYear()}${month}${date}_${hours}${mins}${secs}`;

// Write files
app.get('/create-file', (req, res) => {
    fs.writeFile(`./files/${fileName}.txt`, data, (err)=>{
        if (err) {
            res.send(err);
        } else {
            res.send(`File created successfully - ${fileName}.txt in './files'`);
        }
    })
});

// Retrieve files
app.get('/show-files', (req, res) => {
    fs.readdir("./files", (err, files) => {
        if (err) {
            res.send(err);
        } else {
            res.send(files);
        }
    })
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})