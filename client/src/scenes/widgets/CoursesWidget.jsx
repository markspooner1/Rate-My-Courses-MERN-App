import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "state";
import CourseWidget from "./CourseWidget";
const PostsWidget = ({ userId, picturePath }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts/course", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
    dispatch(setCourses({ courses: data }));
  };
  useEffect(() => {
   
      getPosts();
    
  }, []); 

if(courses != null){
  return (
      <>
      {courses.map(
          ({
          course,
          number
      }) => (
          <CourseWidget 
              course={course}
              number={number}
          />
      )
        )}
      </>
    );
  }
};

export default PostsWidget;