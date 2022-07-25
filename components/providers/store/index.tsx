import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default function storeProvider({children}: any){
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
};