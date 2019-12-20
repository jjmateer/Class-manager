const Curriculum = require("../../models/curriculum");
const router = require("express").Router();

router.post("/new/:title", (req, res) => {
    Curriculum.create({
        title: req.params.title,
        assignments: [],
    })
})
router.post("/view", (req, res) => {
    Curriculum.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
});

router.post("/edit", (req, res) => {
    Curriculum.findOneAndUpdate({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})

module.exports = router;