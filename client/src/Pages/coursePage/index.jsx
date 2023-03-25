import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts} from "../../state";
import NavBar from "../navbar"
import { useParams } from "react-router-dom";
import Post from "../../components/Post";
import { Box, Typography } from "@mui/material";
const CoursePosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const { courseId } = useParams();
  const getPosts = async () => {
    const response = await fetch(`https://mern-server-zx4e.onrender.com/posts/${courseId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    console.log(data);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <NavBar />
      <Box width="100%" p="1rem 6%" textAlign="center">
        <Typography fontWeight="bold" fontSize="20px" color="primary">
          Ratings for {courseId}
        </Typography>
      </Box>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          course,
          number,
          difficulty,
          rating,
          comments,
          professor,
          picture,
        }) => (
          <Box
            width="100%"
            padding="0.5rem 6%"
            display="flex"
            gap="0.2rem"
          >
            <Box flexBasis="42%" m="auto">
              <Post
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                course={course}
                number={number}
                difficulty={difficulty}
                rating={rating}
                comments={comments}
                professor={professor}
                picture={picture}
              />
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default CoursePosts;
