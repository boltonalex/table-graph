import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import graphReducer from '../features/graphs/graphSlice';

export const store = configureStore({
  reducer: {
    graph: graphReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
