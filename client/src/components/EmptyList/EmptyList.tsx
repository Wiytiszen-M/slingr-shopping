import { Box, Button, Typography } from "@mui/material";

type EmptyListProps = {
  setOpen: () => void;
};

const EmptyList = ({ setOpen }: EmptyListProps) => {
  return (
    <Box
      sx={{
        width: 614,
        height: 290,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #C6C6C6",
        gap: 2,
      }}
      borderRadius={5}
    >
      <Typography color="#87898C" sx={{ fontSize: 18 }}>
        Your shopping list is empty :(
      </Typography>
      <Button
        variant="contained"
        size="medium"
        sx={{ textTransform: "none" }}
        onClick={() => setOpen()}
      >
        Add your first item
      </Button>
    </Box>
  );
};

export default EmptyList;
