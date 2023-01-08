// Basic Programming Setup for Modules
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
var _ = require("lodash");

// Blog Content Constants
const homeWriting = "HOME Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutWriting = "ABOUT Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const contactWriting = "CONTACT Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

// Posts
let posts = [];

// Express Gets and Posts

// Express Router Parameter
app.get("/posts/:customPost", function (req, res) {
    let params = req.params.customPost;
    let found = false;
    let postTitle = '';
    let postBody = '';
    for (let i = 0; i < posts.length; i += 1) {
        if (_.lowerCase(posts[i].title) === _.lowerCase(params)) {
            console.log("Match Found!");
            found = true;
            postTitle = posts[i].title;
            postBody = posts[i].body;
        }
    }
    if (found === false) {
        console.error("Match Not Found!");
    }
    res.render("customPost", { postTitle: postTitle, postBody: postBody });
})

app.get("/", function (req, res) {
    res.render("home", { startingHome: homeWriting, posts: posts });
});

app.get("/about", function (req, res) {
    res.render("about", { startingAbout: aboutWriting });
});

app.get("/contact", function (req, res) {
    res.render("contact", { startingContact: contactWriting });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    let post = {
        title: req.body.newTitle,
        body: req.body.newPost
    };
    posts.push(post);
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Server Connected on Port 3000");
});