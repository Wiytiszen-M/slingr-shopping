import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";
import { ShoppingItem } from "@/types";
import { EditOutlined, DeleteOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removeItem, updateItem } from "@/reducers/shoppingListSlice";
import { usePut, useDelete } from "@/hooks/fetch";

interface ShoppingListProps {
  items: ShoppingItem[];
  onEdit: (item: ShoppingItem) => void;
  onDelete: (item: ShoppingItem) => void;
}

const ShoppingList = ({ items, onEdit, onDelete }: ShoppingListProps) => {
  const dispatch = useDispatch();

  const { deleteData } = useDelete<ShoppingItem>(`/items`);

  const { putData } = usePut<ShoppingItem>(`/items`);

  const handleDelete = async (itemId: string) => {
    await deleteData(`/items/${itemId}`);

    dispatch(removeItem(itemId));
  };

  const handleCheckboxChange = (item: ShoppingItem) => {
    const updatedItem = { ...item, cancelled: !item.cancelled };

    putData(`/items/${item.id}`, updatedItem);

    dispatch(updateItem(updatedItem));
  };

  return (
    <List
      sx={{
        width: "100%",
        display: "flex",
        gap: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {items.map((item) => (
        <ListItem
          key={item.id}
          disablePadding
          sx={{
            border: item.cancelled ? "none" : "1px solid #D5DFE9",
            backgroundColor: item.cancelled ? "#D5DFE92B" : "transparent",
            borderRadius: 2,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Checkbox
              sx={{
                color: "#C6C6C6",
              }}
              edge="start"
              checked={item.cancelled}
              tabIndex={-1}
              disableRipple
              onChange={() => handleCheckboxChange(item)}
            />
            <ListItemText
              sx={{ marginLeft: 1 }}
              id={`checkbox-list-label-${item.id}`}
              primary={
                <Typography
                  variant="h3"
                  sx={{
                    color: "#4D81B7",
                    textDecoration: item.cancelled ? "line-through" : "none",
                  }}
                >
                  {item.name}
                </Typography>
              }
              secondary={
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: item.cancelled ? "line-through" : "none",
                  }}
                >
                  {item.description}
                </Typography>
              }
            />
          </Box>
          <Box>
            <IconButton
              onClick={() => onEdit(item)}
              color="primary"
              disabled={item.cancelled}
              sx={{
                color: "#555F7C",
                "&:hover": {
                  color: "#434a64",
                },
              }}
            >
              <EditOutlined />
            </IconButton>
            <IconButton
              onClick={() => onDelete(item)}
              color="primary"
              sx={{
                color: "#555F7C",
                "&:hover": {
                  color: "#434a64",
                },
                ml: 1,
              }}
            >
              <DeleteOutline />
            </IconButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ShoppingList;
