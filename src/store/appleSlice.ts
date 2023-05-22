import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppleState {
  applesFalling: boolean[];
  basketCount: number;
  appleCount: number;
  appleColor: string;
}

const initialState: AppleState = {
  applesFalling: [],
  basketCount: 0,
  appleCount: 5,
  appleColor: "#e66465",
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
    setAppleColor: (state, action: PayloadAction<string>) => {
      state.appleColor = action.payload;
    },
  },
});

export const {
  setApplesFalling,
  incrementBasketCount,
  resetApples,
  incrementAppleCount,
  setAppleColor,
  decrementAppleCount,
} = appleSlice.actions;

export default appleSlice.reducer;
