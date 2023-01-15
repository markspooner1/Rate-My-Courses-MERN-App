import mongoose from "mongoose";
const postSchema = mongoose.Schema(
    {
    course: String,
    number: Number
}, {timestamps: true}
);

const Course = mongoose.model("Course", postSchema);
export default Course;