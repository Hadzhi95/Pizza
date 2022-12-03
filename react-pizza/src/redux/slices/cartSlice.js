import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload)
    },
    removeItem(state, action) {
        state.items = state.items.filter((obj) => obj.id !== action.payload)
    }, 
    clearItems(state, action) {
        state.items = []
    }
  }
})

export const {setCategoryId, setSort, setCurrentPage, setFilters} = cartSlice.actions

export default cartSlice.reducer