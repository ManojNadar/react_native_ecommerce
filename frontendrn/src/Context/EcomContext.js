import React, { createContext, useEffect, useReducer } from "react";
import api from "../ApiConfig/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MyContext = createContext();
const initialState = { currentuser: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentuser: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        currentuser: null,
      };

    default:
      return state;
  }
};
const EcomContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state);

  const login = async (userData, token) => {
    await AsyncStorage.setItem("shoptoken", token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = async () => {
    await AsyncStorage.removeItem("shoptoken");
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const token = await AsyncStorage.getItem("shoptoken");
        console.log(token);
        const response = await api.post("/currentuser", { token });
        if (response.data.success) {
          console.log(response?.data?.currentuser, "currentuser");
          dispatch({
            type: "LOGIN",
            payload: response?.data?.currentuser,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCurrentUser();
  }, []);

  return (
    <MyContext.Provider value={{ state, login, logout }}>
      {children}
    </MyContext.Provider>
  );
};

export default EcomContext;
