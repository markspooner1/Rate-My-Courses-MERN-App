import NavBar from "scenes/navbar";
import { Box, Typography, useMediaQuery } from "@mui/material";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import { useSelector } from "react-redux";
import PostsWidget from "scenes/widgets/PostsWidget";
import CoursesWidgets from "scenes/widgets/CoursesWidget";
const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis="26%">
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box flexBasis="42%">
          <MyPostWidget/>
          <Box width="100%" p="1rem 6%" textAlign="center">
            <Typography fontWeight="bold" fontSize="20px" color="primary">
              Recent activity
            </Typography>
          </Box>
          <PostsWidget userId={_id} />
        </Box>
        <Box flexBasis="26%">
            <Typography fontWeight="bold" fontSize="20px" color="primary">
              Links to Course Ratings
            </Typography>
          <CoursesWidgets />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
