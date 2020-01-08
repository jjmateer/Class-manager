const Curriculum = require("../../models/curriculum");
const Student = require("../../models/student");
const router = require("express").Router();
const mongoose = require('mongoose');
router.post("/new/:title", (req, res) => {
    const newCurriculum = {
        title: req.params.title
    }
    Curriculum.create(newCurriculum)
        .then(() => {
            Student.updateMany(
                {},
                {
                    $push: {
                        grades: {
                            title: req.params.title,
                            assignments: []
                        }
                    }
                }
            ).then(() => { res.status(200).json({ msg: "Subject added to database." }) })
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})
router.get("/get-all", (req, res) => {
    Curriculum.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})

router.put("/add-assignment/:title", (req, res) => {
    Curriculum.findOneAndUpdate(
        { title: req.params.title },
        {
            $push: {
                assignments: {
                    _id: new mongoose.Types.ObjectId(),
                    title: req.body.data,
                    gradeN: null,
                    gradeM: null
                }
            }
        }
    )
        .then(data => {
            console.log(data)
            Student.updateMany(
                { "grades.title": req.params.title },
                {
                    $push: {
                        "grades.$.assignments": {
                            title: req.body.data,
                            gradeN: null,
                            gradeM: null
                        }
                    }
                },
            ).then(data => { console.log(data) })
            res.status(200).json({ msg: data })
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})

router.get("/view/:subject", (req, res) => {
    Curriculum.findOne({ title: req.params.subject })
        .then(data => {
            res.status(200).json(data)
            console.log(data)
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})
router.delete("/delete-subject/:id/:title", (req, res) => {
    console.log(req.params.title)
    console.log(req.params.id)
    Curriculum.deleteOne(
        { _id: req.params.id }
    )
        .then(data => {
            Student.updateMany(
                {},
                {
                    $pull: {
                        grades: { title: req.params.title }
                    }
                }
            ).then(data => { console.log(data) })
            res.status(200).json({ msg: "Subject deleted from database." })
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})
router.put("/delete-assignment/:id/:assignment", (req, res) => {
    let newData;
    Curriculum.findOne(
        { _id: req.params.id }
    )
        .then(data => {
            // console.log(data.assignments)
            for (let i = 0; i < data.assignments.length; i++) {
                // console.log(req.params.assignment);
                // console.log(data.assignments[i].title);
                // console.log(data.assignments[i])
                if (data.assignments[i].title === req.params.assignment) {
                    // console.log(data.assignments.indexOf(data.assignments[i]));
                    // let updatedArr = data.assignments.splice(data.assignments.indexOf(data.assignments[i]), 1);
                    var filtered = data.assignments.filter((element) => {
                        return element.title != req.params.assignment;
                    });
                    // console.log(filtered)
                    data.assignments = filtered;
                    newData = data;
                }
            }
        }).then(() => {
            console.log(newData.assignments)
            Curriculum.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { assignments: newData.assignments } }
            ).then(() => {
                res.status(200).json({ msg: "Assignment deleted." })
            })
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})


module.exports = router;