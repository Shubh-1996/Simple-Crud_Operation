const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")
const mongoose = require("mongoose");
//app.listen(3000, () => console.log("Server Up and running"));
const Table = require("./models/Table");

mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
    app.listen(process.env.PORT || 3000, () => console.log("Mongoose Server Up and running"));
})

// Post

app
    .route("/add-table")
    .post(async (req, res) => {
        const table = new Table({
            content: req.body.content,
            title: req.body.title,
            heading: req.body.heading,
            photoURL: req.body.photoURL,

        });
        try {
            await table.save();
            res.send({ "result": "success" });

        } catch (err) {
            res.send({ "error": err });
        }
    });

// Update
app
    .route("/update")
    .post((req, res) => {
        const id = req.body._id;
    console.log("reqwww", req.body._id);
        Table.findById(id, (err,obj) => {
            if(err) {
                res.send({"error": "Record not found"})
            } else {
                // console.log("obj ", obj);
                // console.log(
                //     "body" , req.body
                // );
                obj.content = req.body.content;
                obj.title = req.body.title;
                obj.heading =req.body.heading;
                obj.photoURL=  req.body.photoURL;
                obj.save((error) => {
                    if(error) {

                    } else {
                        res.json({

                            "result" : "Record updated",
                            "data": obj
                        })
                    }
                })
            }
        }
        );
    });


//DELETE

app.route("/remove")
    .delete((req, res) => {
        const id = req.body._id;
        console.log("eee",req.body._id);
        Table.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.send({ "result": "success" })
        });
    });


//get

app
    .route("/getAlltable")
    .get((req, res) => {
        Table.find({}, (err, obj) => {
            res.send(obj);
        });
    });