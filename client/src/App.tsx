import Header from "@/components/Header/Header";
import { Box, Button, Typography } from "@mui/material";
import { useGet } from "@/hooks/fetch";
import { ShoppingItem } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "@/reducers/shoppingListSlice";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import AddItemModal from "./components/AddItemModal/AddItemModal";

const App = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleModal = () => setOpen((prev) => !prev);
  const dispatch = useDispatch();
  const { data, loading, error } = useGet<ShoppingItem[]>("/items");
  const listItems = useSelector(
    (state: { shoppingList: { items: ShoppingItem[] } }) =>
      state.shoppingList.items
  );

  useEffect(() => {
    if (data) {
      dispatch(setItems(data));
    }
  }, [data, dispatch]);
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
        <Box>
          <Typography variant="h4" align="left">
            Your Items
          </Typography>
          <Button onClick={toggleModal} color="primary">
            Add Item
          </Button>
          <ShoppingList items={listItems} />
        </Box>
      </Box>
      <AddItemModal open={open} onClose={toggleModal} />
    </>
  );
};

export default App;
