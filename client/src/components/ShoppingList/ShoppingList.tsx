import { ShoppingItem } from "@/types";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
} from "@mui/material";

import { FC } from "react";

interface ShoppingListProps {
  items: ShoppingItem[];
}

const ShoppingList = ({ items }: ShoppingListProps) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id} disablePadding>
          <ListItemText
            id={`checkbox-list-label-${item.id}`}
            primary={item.name}
            secondary={item.description}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ShoppingList;
