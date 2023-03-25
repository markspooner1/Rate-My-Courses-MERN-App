import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Slider
} from "@mui/material";
import { Formik} from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "./Wrapper";

const initialValuesRegister = {
  course: "",
  number: "",
  professor: "",
  difficulty: "",
  rating: "",
  review: ""
};

const Rating = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const _id = useSelector((state) => state.user);
  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("userId", _id._id);
    for (let value in values) 
    {
      console.log(value);
      formData.append(value, values[value]);
    }
    console.log(formData);
    const savedUserResponse = await fetch(
      "https://mern-server-zx4e.onrender.com/posts",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      } 
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    navigate(`/course/${values.course}-${values.number}`);
  };

  return (
    <Wrapper>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={ {initialValuesRegister}}
      >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
      <form onSubmit={handleSubmit}>
       <Box width="100%" p="1rem 6%" textAlign="center">
            <Typography fontWeight="bold" fontSize="32px" color="primary">
                Rate a course
            </Typography>
        </Box>
          <Box
            display="grid"
            gap="5px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))">
              <>
                <TextField
                  label="Course Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.course}
                  name="course"
                  error={
                    Boolean(touched.course) && Boolean(errors.course)
                  }
                  helperText={touched.course && errors.course}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Course Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.number}
                  name="number"
                  error={Boolean(touched.number) && Boolean(errors.number)}
                  helperText={touched.number && errors.number}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Professor"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.professor}
                  name="professor"
                  error={Boolean(touched.professor) && Boolean(errors.professor)}
                  helperText={touched.professor && errors.professor}
                  sx={{ gridColumn: "span 4" }}
                />


                <Box gridColumn="span 4" border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" p="0.25rem">
                  <Typography  fontSize="10px">Rating</Typography>
                  <Slider 
                  defaultValue = {10}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.rating}
                  name="rating"
                  valueLabelDisplay="auto"
                  error={Boolean(touched.rating) && Boolean(errors.rating)}
                  helperText={touched.rating && errors.rating}
                  sx={{ gridColumn: "span 4" }} />
                  <Typography fontSize="10px">Difficulty</Typography>
                  <Slider
                  valueLabelDisplay="auto"
                  defaultValue = {10}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.difficulty}
                  name="difficulty"
                  error={Boolean(touched.difficulty) && Boolean(errors.difficulty)}
                  helperText={touched.difficulty && errors.difficulty}
                  sx={{ gridColumn: "span 4" }} />
                </Box>
                <TextField
                  label="Comments"
                  multiline
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.comments}
                  name="comments"
                  rows={4}
                  error={
                    Boolean(touched.comments) && Boolean(errors.comments)
                  }
                  helperText={touched.comments && errors.comments}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
          </Box>
          {/* BUTTONS */}
            <Button 
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}>
              Submit Rating
            </Button>
      </form>




    )}
    </Formik>
    </Wrapper>
  );
            };

export default Rating;