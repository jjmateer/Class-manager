const Student = require("../../models/student");
const router = require("express").Router();

router.post("/new", (req, res) => {
    console.log(req.body);
    const { firstName, lastName, birthday } = req.body;
    Student.findOne({ firstName: firstName, lastName: lastName })
        .then(student => {
            if (!student) {
                Student.create({
                    firstName: firstName,
                    lastName: lastName,
                    grade: null,
                    birthday: birthday,
                    completion: 0
                }).then(data => {
                    res.status(200).json(data)
                })
            } else {
                res.status(400).json({ msg: "Student already exists." })
            }
        })
});

router.get("/all", (req, res) => {
    console.log(req.body);
    Student.find({})
        .then(data => {
            res.status(200).json({ students: data });
        })
})

module.exports = router;