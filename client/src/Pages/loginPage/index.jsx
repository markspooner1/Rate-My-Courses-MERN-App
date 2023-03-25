import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Form from "./Form";
const LoginPage = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const loadServer = async () => {
    await fetch("https://mern-server-zx4e.onrender.com/pre-warm").then(() => {
      setLoading(false);
    });
  };
  useEffect(() => {
    loadServer();
  }, []);

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Rate My Courses
        </Typography>
      </Box>
      <Box
        width="100%"
        textAlign="center"
      >
        {loading && <Typography fontWeight="bold" fontSize="20px" color="primary">Loading... </Typography>}
      </Box>
      {(!loading ) && (
        <Box
          width="50%"
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Form />
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;
