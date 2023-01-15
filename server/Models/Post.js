/*post schema:  
    -userID
    -fName,lName
    -location
    -description
    -userpath
    -picture path
    -likes (object with reference to who liked the post)
    -comments ()
*/  
import mongoose from "mongoose";
const postSchema = mongoose.Schema(
    {
    userId:{
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    course: String,
    number: Number,
    difficulty: Number,
    rating: Number,
    comments: String,
    professor: String,
    picture: String

}, {timestamps: true}
);

const Post = mongoose.model("Post", postSchema);
export default Post;