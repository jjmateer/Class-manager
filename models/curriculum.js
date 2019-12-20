const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const curriculumSchema = new Schema({
    assignments: {
        type: Object,
        required: true
    },
    studentCreated: {
        type: Date,
        default: Date.now
    }
});
const Curriculum = mongoose.model("Curriculum", curriculumSchema);
module.exports = Curriculum;