  import { Box,Typography, useTheme } from "@mui/material";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useNavigate } from "react-router-dom";
  const CourseWidget = ({
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
        <WidgetWrapper>
          <Box>
              <Typography display = "inline" color={main} fontWeight="500" >
                  <Box sx = {{"&:hover": {cursor: "pointer"}}} onClick = {() => {navigate(`/course/${course}-${number}`)}}display = "inline" color={medium}> {course} {number} </Box>
              </Typography>
          </Box>
    </WidgetWrapper>
    </Box>
    </>
    );
  };
  
  export default CourseWidget;
  