
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import Wrapper from "./Wrapper";
import UserImage from "./UserImage";
const Post = ({
  key,
  postId,
  postUserId,
  name,
  course,
  number,
  difficulty,
  rating,
  comments,
  professor,
  picture,
}) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
      <>
    <Box sx={{ mt: 1 }}>
      <Wrapper>
        <FlexBetween gap="0.5rem" pb="1.1rem">
          <FlexBetween gap="1rem">
            <UserImage image ={picture}/>
            <Box>
              <Typography
                variant="h4"
                color={main}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {name}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
        <Box gridColumn="span 4" border={`3px solid ${primaryLight}}`} borderRadius="5px" p="0.25rem">
            <Typography display = "inline" color={main} fontWeight="500" >
                Course:<Typography display = "inline" color={medium}> {course} {number}   </Typography>
            </Typography>
            <Typography color={main} fontWeight="500">
                Professor: <Typography display = "inline" color={medium}>{professor}</Typography>
            </Typography>
            <Typography color={main} fontWeight="500">
                Difficulty: <Typography display = "inline" color={medium}>{difficulty}/100</Typography>
            </Typography>
            <Typography color={main} fontWeight="500">
                Overall Rating: <Typography display = "inline" color={medium}>{rating}/100</Typography>
            </Typography>
            <Typography color={main} fontWeight="500">
                Comments: <Typography display = "inline" color={medium}>{comments}</Typography>
            </Typography>
        </Box>
       
        

  </Wrapper>
  </Box>
  </>
  );
};

export default Post;
