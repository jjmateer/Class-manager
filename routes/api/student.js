const Student = require("../../models/student");
const Curriculum = require("../../models/curriculum");
const router = require("express").Router();

router.post("/new", (req, res) => {
    const { firstName, lastName, birthday } = req.body;
    Student.findOne({ firstName: firstName, lastName: lastName })
        .then(student => {
            if (!student) {
                Student.create({
                    firstName: firstName,
                    lastName: lastName,
                    grades: [],
                    birthday: birthday,
                }).then(data => {
                    res.status(200).json({ data, msg: { msg: "Student added to database." } })
                    Curriculum.find({})
                        .then(subjects => {
                            Student.findOneAndUpdate({ firstName: firstName, lastName: lastName },
                                { $set: { grades: subjects } }).then(() => { console.log("Subjects added to new student.") })
                        })
                })
            } else {
                res.status(400).json({ msg: "Student already exists." })
            }
        })
});

router.get("/all", (req, res) => {
    Student.find({}).sort({ lastName: 1 })
        .then(data => {
            res.status(200).json({ students: data });
        })
})

router.put("/delete/:id", (req, res) => {
    Student.findOneAndDelete({ _id: req.params.id })
        .then(res.status(200).json({ msg: "Student removed from database." }))
        .catch(err => {
            res.status(400).json({ msg: "Cannot delete student from database." });
        })
})

router.put("/update/:id", (req, res) => {
    const { firstName, lastName, birthday } = req.body;
    Student.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                firstName: firstName,
                lastName: lastName,
                birthday: birthday
            }
        }
    )
        .then(data => {
            res.status(200).json(data)
        })
        .catch(() => {
            res.status(400).json({ msg: "Student info update failed." });
        })
})

router.put("/grade-student", (req, res) => {
    console.log(req.body)
    const { student, assignment, value } = req.body;
    // const assignmentQuery = `grades.$[title: "${assignment}"].assignments.$["${assignment}"]`
    Student.findOne({ _id: student })
        .then(studentData => {
            // console.log(studentData.grades)
            for (let i = 0; i < studentData.grades.length; i++) {
                for (let j = 0; j < studentData.grades[i].assignments; j++) {
                    if (studentData.grades[i].assignments[j].title === assignment) {
                        console.log("working")
                    }
                }
                console.log(studentData.grades[i].assignments)
            }
        })

})

router.get("/view/:id", (req, res) => {
    Student.findOne({ _id: req.params.id })
        .then(data => {
            res.status(200).json({ view_student: data });
        })
        .catch(() => {
            res.status(400).json({ msg: "Could not view student." })
        })
})

module.exports = router;