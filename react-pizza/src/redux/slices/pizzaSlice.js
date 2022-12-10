import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) =>{
        const {
            sortBy,
            order,
            category,
            search,
        currentPage} = params
        const {data} = await axios.get(

            `https://6329d2b14c626ff832cb763a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        return data
    }
)

const initialState = {
  items: [],
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    }
  },
  extraRedusers:{
    [fetchPizzas.pending]: (state, action) => {
        console.log('loading');
    },
    [fetchPizzas.fulfilled]: (state, action) => {
        console.log('ok');
    },[fetchPizzas.rejected]: (state, action) => {
        console.log('neok');
    }
  }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer