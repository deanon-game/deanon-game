const express = require("express");
const db = require("./database.js");

const app = express()


//rout
app.get("/", function (req, res) {
    var mas = []
    db.collection("users").get().then((snap) => {
        snap.forEach((doc) => {
            console.log(doc.data())
            mas.push(doc.data())
        })
        res.send(mas[0].name)
    })
})


app.listen(3000, function () {
    console.log('шото работает')
})