const localStorageName = "cartStore";

type TFavoritesPersisted = { ids: string[] };

type TPersistedState = {
  cart: {
    items: unknown[];
    isVisible: boolean;
  };
  favorites: TFavoritesPersisted;
};

export const loadState = (): TPersistedState => {
  const tempState: TPersistedState = {
    cart: {
      items: [],
      isVisible: false,
    },
    favorites: { ids: [] },
  };
  try {
    const serializedState = localStorage.getItem(localStorageName);
    if (!serializedState) return tempState;
    const parsed = JSON.parse(serializedState) as Partial<TPersistedState>;
    if (parsed.cart?.items) tempState.cart.items = parsed.cart.items;
    if (typeof parsed.cart?.isVisible === "boolean") tempState.cart.isVisible = parsed.cart.isVisible;
    if (Array.isArray(parsed.favorites?.ids)) {
      tempState.favorites.ids = parsed.favorites.ids.filter((id): id is string => typeof id === "string");
    }
    return tempState;
  } catch {
    return tempState;
  }
};
//eslint-disable-next-line
export const saveState = (state: { cart: unknown; favorites: TFavoritesPersisted }) => {
  try {
    const serializedState = JSON.stringify({
      cart: state.cart,
      favorites: state.favorites,
    });
    localStorage.setItem(localStorageName, serializedState);
  } catch {
    console.error("Failed to save state");
  }
};
