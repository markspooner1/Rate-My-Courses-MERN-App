import Course from "../Models/Course.js";
import Post from "../Models/Post.js";
import User from "../Models/user.js"
//create 
export const createPost = async(req, res) =>{
    try{
        const {userId, course, number, difficulty, rating, comments, professor} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            course,
            number,
            difficulty,
            rating,
            comments,
            professor,
            picture: user.picturePath
        })
        const newCourse = new Course({
            course: course,
            number: number
        })
        const courseExist = await Course.find({"course":course});
        const numExist = await Course.find({"number":number});
        if(!(courseExist.length >= 1 && numExist.length >= 1)){
            await newCourse.save();
        }
        await newPost.save();
        const post = await Post.find();

        res.status(201).json(post);
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

//read
export const getFeedPosts = async (req, res) =>{
    try {
        console.log("hello world")
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const getCourses = async(req, res) => {
    try{
        console.log("hellp");
        const courses = await Course.find();
        console.log(courses)
        res.status(200).json(courses);
    }catch (err) {
        res.status(404).json({message: err.message});
    }
}
export const getSpecifcPosts = async (req, res) => {
    const {courseId} = req.params;
    const courseNameId = courseId.split("-");
    try{
        const posts = await Post.find();
        var newArray = posts.filter(function (el) {
            return el.course === courseNameId[0] && el.number == parseInt(courseNameId[1]);
        });
        
        res.status(200).json(newArray);
    }catch (err) {
        res.status(404).json({message: err.message});
    }

}

export const getUserPosts = async(req,res) =>{
    try {
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}
