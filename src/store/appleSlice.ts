import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppleState {
  applesFalling: boolean[];
  basketCount: number;
  appleCount: number;
}

const initialState: AppleState = {
  applesFalling: [],
  basketCount: 0,
  appleCount: 0,
};

export const appleSlice = createSlice({
  name: "apple",
  initialState,
  reducers: {
    setApplesFalling: (state, action: PayloadAction<boolean[]>) => {
      state.applesFalling = action.payload;
    },
    incrementBasketCount: (state, action: PayloadAction<number>) => {
      state.basketCount += action.payload;
    },
    resetApples: (state) => {
      state.applesFalling = [false, false, false, false, false];
      state.basketCount = 0;
    },
    incrementApple: (state, action: PayloadAction<number>) => {
      state.appleCount += action.payload;
    },
    decrementApple: (state, action: PayloadAction<number>) => {
      state.appleCount -= action.payload;
    },
  },
});

export const {
  setApplesFalling,
  incrementBasketCount,
  resetApples,
  incrementApple,
  decrementApple,
} = appleSlice.actions;

export default appleSlice.reducer;
