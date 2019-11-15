
const generateHTML = require("./generateHTML");
const axios = require("axios");
var inquirer = require('inquirer');
const fs = require('fs')

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your Githubusername?",
            name: "username"
        },
        {
            type: "list",
            message: "What is your favorite color?",
            name: "color",
            choices: ["green", "blue", "pink", "red"]
        },

    ])
    .then(answers => {
        console.info('searching....');

        gatherData(answers);
        // console.info('Answer:', answers.username);
        // console.info('Answer:', answers.color);
    });


function gatherData(answers) {
    const queryUrl = `https://api.github.com/users/${answers.username}`;

    axios.get(queryUrl).then(function (res) {
        // // console.log(res);
        //  console.log(res.data.location);
        //  console.log(res.data.bio);
        //  console.log(res.data.company);
        //  console.log(res.data.blog);
        //  console.log(res.data.html_url);
        //  console.log(res.data.avatar_url);
        //  console.log(res.data.public_repos);
        //  console.log(res.data.followers);
        //  console.log(res.data.following);


        var userdetails = {
            name: res.data.name,
            location: res.data.location,
            bio: res.data.bio,
            company: res.data.company,
            blog: res.data.blog,
            html_url: res.data.html_url,
            avatar_url: res.data.avatar_url,
            public_repos: res.data.public_repos,
            followers: res.data.followers,
            following: res.data.following,
            color: answers.color,
        }
        console.log(userdetails);
        const stringhtml = generateHTML(userdetails);
        writeToFile(stringhtml);
    });

}


//Data Needed
//data.name
//data.location
//data.company
//data.blog
//data.html_url
//data.avatar_url
//data.public_repos
//data.followers
//data.following


function writeToFile(stringhtml) {
    fs.writeFile('profile.html', stringhtml, (err) => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    })

 }
// writeToFile(userdetails);
// function init() {

// init();


// Github Username
//Favorite color (4 specific)
//choose one and says searching...