import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Apple {
  id: string;
  color: string;
  isFalling: boolean;
  isInBasket: boolean;
  top: string;
  left: string;
}

interface AppleState {
  apples: Apple[];
}

const initialState: AppleState = {
  apples: [],
};

export const appleSlice = createSlice({
  name: "apple",
  initialState,
  reducers: {
    addApple: (state, action: PayloadAction<Apple>) => {
      state.apples.push(action.payload);
    },
    removeApple: (state, action: PayloadAction<string>) => {
      state.apples = state.apples.filter(
        (apple) => apple.id !== action.payload
      );
    },
    setAppleFalling: (state, action: PayloadAction<string>) => {
      const apple = state.apples.find((apple) => apple.id === action.payload);
      if (apple) {
        apple.isFalling = true;
      }
    },
    setAppleInBasket: (state, action: PayloadAction<string>) => {
      const apple = state.apples.find((apple) => apple.id === action.payload);
      if (apple) {
        apple.isInBasket = true;
      }
    },
    setAppleColor: (
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) => {
      const apple = state.apples.find(
        (apple) => apple.id === action.payload.id
      );
      if (apple) {
        apple.color = action.payload.color;
      }
    },
    resetApples: (state) => {
      state.apples = [];
    },
  },
});

export const {
  addApple,
  removeApple,
  setAppleFalling,
  setAppleInBasket,
  setAppleColor,
  resetApples,
} = appleSlice.actions;

export const selectApples = (state: RootState) => state.apple.apples;

export default appleSlice.reducer;
