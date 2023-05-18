import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppleState {
  applesFalling: boolean[];
  basketCount: number;
  appleCount: number;
}

const initialState: AppleState = {
  applesFalling: [],
  basketCount: 0,
  appleCount: 5,
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
    incrementAppleCount: (state) => {
      if (state.appleCount < 10) {
        state.appleCount += 1;
      }
    },
    decrementAppleCount: (state) => {
      if (state.appleCount > 0) {
        state.appleCount -= 1;
      }
    },
  },
});

export const {
  setApplesFalling,
  incrementBasketCount,
  resetApples,
  incrementAppleCount,
  decrementAppleCount,
} = appleSlice.actions;

export default appleSlice.reducer;
