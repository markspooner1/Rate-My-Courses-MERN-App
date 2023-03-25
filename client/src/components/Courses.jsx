import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../state";
import Course from "./Course";
const Courses = ({ userId, picturePath }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("https://mern-server-zx4e.onrender.com/posts/course", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
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
          <Course
              course={course}
              number={number}
          />
      )
        )}
      </>
    );
  }
};

export default Courses;