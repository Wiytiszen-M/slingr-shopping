export interface ShoppingItem {
  id?: string;
  name: string;
  quantity: string;
  description: string;
  cancelled?: boolean;
}

export interface ShoppingListState {
  items: ShoppingItem[];
}
