import { createSlice } from "@reduxjs/toolkit"

const messageSlice = createSlice({
  name: "message",
  initialState: { 
    // message: "Initial message"
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
})

export const { decrement, increment, incrementByAmount } = messageSlice.actions;
export default messageSlice.reducer;