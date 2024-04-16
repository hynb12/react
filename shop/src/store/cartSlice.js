import { createSlice } from "@reduxjs/toolkit";

export let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],

  reducers: {
    addCart(state, action) {
      let item = action.payload;
      let index = state.findIndex((e) => e.id == item.id);
      if (index > -1) {
        state[index].count += 1;
      } else {
        let addItem = { id: item.id, name: item.title, count: 1 };
        state.push(addItem);
        state.sort((a, b) => a.id - b.id);
      }
    },
  },
});

export let { addCart } = cart.actions;
