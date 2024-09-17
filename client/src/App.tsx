import Header from "@/components/Header/Header";
import { Box } from "@mui/material";

const App = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "calc(100vh - 64px)",
          width: "100%",
          mt: 8,
          pt: 8,
        }}
      >
        First TRY
      </Box>
    </>
  );
};

export default App;
