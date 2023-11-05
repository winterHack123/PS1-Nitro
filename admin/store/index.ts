import { configureStore } from '@reduxjs/toolkit';
// import tasksReducer, { tasksMiddleware } from './Tasks.store';
import customersReducer from './customer.store';

const store = configureStore({
  reducer: { customer: customersReducer },
  //   middleware: (getDefaultMiddleware: any) =>
  //     getDefaultMiddleware().concat(tasksMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store;
