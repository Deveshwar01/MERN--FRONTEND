import React, { useEffect, useState } from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import {Toaster} from 'react-hot-toast'



const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes />
        <Toaster/>
      </Provider>
    </>
  );
};

export default App;
