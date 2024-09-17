import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#4D81B7", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div">
          SHOPPING LIST
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
