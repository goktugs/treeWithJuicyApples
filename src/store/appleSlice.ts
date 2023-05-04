import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppleState {
  applesFalling: boolean[];
  basketCount: number;
}

const initialState: AppleState = {
  applesFalling: [],
  basketCount: 0,
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
  },
});

export const { setApplesFalling, incrementBasketCount, resetApples } =
  appleSlice.actions;

export default appleSlice.reducer;
