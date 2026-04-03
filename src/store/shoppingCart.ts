import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

import { TCartItem } from "@/shared/types/shoppingCart";

import { loadState, saveState } from "./storeLocalStorage";

export type TCartState = {
  items: TCartItem[];
  isVisible: boolean;
};

export type TFavoritesState = {
  ids: string[];
};

type QuantityChange = {
  productId: string;
  amount: number;
};

const initialState: TCartState = { isVisible: false, items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state: TCartState, action: PayloadAction<TCartItem>) => {
      const isAvailable = state.items.findIndex((item) => item.productId === action.payload.productId);
      if (isAvailable > -1) {
        state.items[isAvailable].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.isVisible = true;
    },
    toggleCart: (state: TCartState, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload.valueOf();
    },
    remove: (state: TCartState, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    modifyQuantity: (state: TCartState, action: PayloadAction<QuantityChange>) => {
      state.items.map((item) =>
        item.productId === action.payload.productId ? (item.quantity += action.payload.amount) : ""
      );
    },
  },
});

const favoritesInitialState: TFavoritesState = { ids: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: favoritesInitialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.ids.indexOf(id);
      if (index > -1) {
        state.ids.splice(index, 1);
      } else {
        state.ids.push(id);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter((x) => x !== action.payload);
    },
  },
});

const persisted = loadState();

export const shoppingCartStore = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
  preloadedState: {
    cart: {
      ...initialState,
      ...persisted.cart,
      items: persisted.cart.items as TCartItem[],
    },
    favorites: {
      ...favoritesInitialState,
      ...persisted.favorites,
    },
  },
});
shoppingCartStore.subscribe(() => {
  saveState(shoppingCartStore.getState());
});

export type RootState = ReturnType<typeof shoppingCartStore.getState>;
export type AppDispatch = typeof shoppingCartStore.dispatch;

export const { add, remove, modifyQuantity, toggleCart } = cartSlice.actions;
export const { toggleFavorite, removeFavorite } = favoritesSlice.actions;
