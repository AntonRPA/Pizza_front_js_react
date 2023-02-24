import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TPizza, TSearchPizzas } from './types';

export const fetchPizzas = createAsyncThunk<TPizza[], TSearchPizzas>(
  'pizza/fetchPizzasStatus',
  async ({ sortBy, order, category, search, currentPage }) => {
    const { data } = await axios.get<TPizza[]>(
      `https://63dcc767367aa5a7a401c039.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${category}${search}`,
    );

    return data;
  },
);
