  import { Box,Typography, useTheme } from "@mui/material";
  import Wrapper from "./Wrapper";
  import { useNavigate } from "react-router-dom";
  const Course = ({
    course,
    number,
  }) => {
 
    const navigate = useNavigate();
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    return (
        <>
      <Box sx={{ mt: 0.5 }}>
        <Wrapper>
          <Box>
              <Typography display = "inline" color={main} fontWeight="500" >
                  <Box sx = {{"&:hover": {cursor: "pointer"}}} onClick = {() => {navigate(`/course/${course}-${number}`)}}display = "inline" color={medium}> {course} {number} </Box>
              </Typography>
          </Box>
        </Wrapper>
    </Box>
    </>
    );
  };
  
  export default Course;
  