import { Pizza, SearchPizzaParams } from "./types";
import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk<Pizza[],SearchPizzaParams>(
    'pizza/fetchPizzasStatus', async (params) => {
      const { order, sortBy, category, search, currentPage } = params;
      const { data } = await axios.get<Pizza[]>(`https://6329d2b14c626ff832cb763a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      return data
    }
  )
  