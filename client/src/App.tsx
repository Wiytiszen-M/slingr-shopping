import { useDispatch, useSelector } from "react-redux";
import {
  setItems,
  addItem,
  updateItem,
  removeItem,
} from "@/reducers/shoppingListSlice";
import { useDelete, useGet, usePost, usePut } from "@/hooks/fetch";
import { ShoppingItem } from "@/types";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "@/components/Header/Header";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import AddItemModal from "./components/AddItemModal/AddItemModal";
import ConfirmDialog from "./components/ConfirmDialog/ConfirmDialog";
import { RootState } from "./store/store";
import CircularProgress from "@mui/material/CircularProgress";
import EmptyList from "./components/EmptyList/EmptyList";

const App = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<ShoppingItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<ShoppingItem | null>(null);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const toggleModal = () => setOpen((prev) => !prev);
  const dispatch = useDispatch();
  const { data, loading } = useGet<ShoppingItem[]>("/items");
  const { postData } = usePost<ShoppingItem>("/items");
  const { putData } = usePut<ShoppingItem>("/items");
  const { deleteData } = useDelete("/items");

  const listItems = useSelector((state: RootState) => state.shoppingList.items);

  useEffect(() => {
    if (!loading && data) {
      dispatch(setItems(data));
    }
  }, [data, loading, dispatch]);

  const handleAddOrEditItem = async (item: ShoppingItem) => {
    if (item.id) {
      await putData(`/items/${item.id}`, item);
      dispatch(updateItem(item));
    } else {
      const newItem: ShoppingItem | null = (await postData(item)) ?? null;
      if (newItem) {
        dispatch(addItem(newItem));
      }
    }
  };

  const handleEditClick = (item: ShoppingItem) => {
    setCurrentItem(item);
    setOpen(true);
  };

  const handleDeleteClick = (item: ShoppingItem) => {
    setItemToDelete(item);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await deleteData(`/items/${itemToDelete.id}`);
      if (itemToDelete?.id) {
        dispatch(removeItem(itemToDelete.id));
      }
    }
    setConfirmOpen(false);
  };

  return (
    <>
      <Header />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            mt: 16,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: 1025,
            mx: "auto",
            mt: 8,
            pt: 8,
          }}
        >
          {listItems.length ? (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h2" align="left">
                  Your Items
                </Typography>
                <Button
                  onClick={() => {
                    setCurrentItem(null);
                    toggleModal();
                  }}
                  sx={{ textTransform: "none" }}
                  color="primary"
                  variant="contained"
                >
                  Add Item
                </Button>
              </Box>
              <ShoppingList
                items={listItems}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            </>
          ) : (
            <EmptyList setOpen={toggleModal} />
          )}
        </Box>
      )}
      <AddItemModal
        open={open}
        onClose={toggleModal}
        currentItem={currentItem}
        onSubmit={handleAddOrEditItem}
      />
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Item?"
        description="Are you sure you want to delete this item? This cannot be undone."
      />
    </>
  );
};

export default App;
