const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    grade: {
        type:Number,
        required: false
    },
    assignments: {
        type:Object,
        required: false
    },
    birthday: {
        type:String,
        required: true
    },
    studentCreated: {
        type: Date,
        default: Date.now
    }
});
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;