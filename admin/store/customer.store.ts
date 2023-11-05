import { Customer } from '@/types/collections';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: {
  customers: Customer[];
} = {
  customers: [],
};

const customerSlice = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    setCustomers(state, action: PayloadAction<Customer[]>) {
      state.customers = action.payload;
    },
    addCustomer(state, action: PayloadAction<Customer>) {
      state.customers = [action.payload, ...state.customers];
    },
    updateCustomer(state, action: PayloadAction<Customer>) {
      state.customers = [
        ...state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        ),
      ];
    },
    deleteCustomer(state, action: PayloadAction<number>) {
      state.customers = [
        ...state.customers.filter((customer) => customer.id !== action.payload),
      ];
    },
  },
});

export const customerActions = customerSlice.actions;
export default customerSlice.reducer;
