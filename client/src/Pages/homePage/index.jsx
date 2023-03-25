import { Box, Typography} from "@mui/material";
import { useSelector } from "react-redux";
import Posts from "../../components/Posts"

import NavBar from "../navbar";
import User from "../../components/User"
import Rating from "../../components/Rating";
import Courses from "../../components/Courses";
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
          <User userId={_id} picturePath={picturePath} />
        </Box>
        <Box flexBasis="42%">
          <Rating/>
          <Box width="100%" p="1rem 6%" textAlign="center">
            <Typography fontWeight="bold" fontSize="20px" color="primary">
              Recent activity
            </Typography>
          </Box>
          <Posts userId={_id} />
        </Box>
        <Box flexBasis="26%">
            <Typography fontWeight="bold" fontSize="20px" color="primary">
              Links to Course Ratings
            </Typography>
          <Courses />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
