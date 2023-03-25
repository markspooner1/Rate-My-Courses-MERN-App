import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import Post from "./Post";

const Posts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("https://mern-server-zx4e.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data}));
  };

  useEffect(() => {
 
      getPosts();
    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if(posts != null){
      return (
        <>
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
              picture
            }) => (
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
            )
          )}
        </>
      );
    }
};

export default Posts;