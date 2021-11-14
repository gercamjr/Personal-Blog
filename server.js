const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const { AceBaseServer } = require('acebase-server');
const server = new AceBaseServer('my_server_db', { /* server config */ });
server.ready(() => {
    // Server running
});
let initial_path = path.join(__dirname, "public");
const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.listen("3000", () => {
    console.log('listening......');
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, 'editor.html'));
})

app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if (err) {
            throw err;
        } else {
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})




app.get("/admin", (req, res) => {
    res.sendFile(path.join(initial_path, "dashboard.html"));
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.get("/:blog/editor", (req, res) => {
    res.sendFile(path.join(initial_path, 'editor.html'));
})

app.use((req, res) => {
    res.json("404");
})