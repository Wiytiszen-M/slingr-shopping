export interface ShoppingItem {
  id?: string;
  name: string;
  quantity: string;
  description: string;
}

export interface ShoppingListState {
  items: ShoppingItem[];
}
