import { configureStore } from "@reduxjs/toolkit";
import registerAuth from "./registerAuth";
import loginAuth from "./loginAuth";
import adsAuth from "./adsAuth";
import AdminDash from "./Admin/AdminDash";
const store = configureStore({
  reducer: {
    registerUser: registerAuth,
    userLogin: loginAuth,
    adsAuth: adsAuth,
    ads: AdminDash,
  },
});

export default store;
