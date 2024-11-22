import { createContext, useContext, useReducer } from "react";

interface UserContextType {
  // Define the properties of your context here
  _id: string;
  login: (id: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

const initialState = {
  _id: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        _id: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        _id: null,
      };

    default:
      return state;
  }
}

function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const [{ _id }, dispatch] = useReducer(reducer, initialState);

  function login(id: string) {
    dispatch({ type: "LOGIN", payload: id });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <UserContext.Provider
      value={{
        _id,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUserContext() {
  const context = useContext(UserContext);

  if (context === null)
    throw new Error("UserContext was outside the UserProvider");

  return context;
}

export { UserInfoProvider, useUserContext };
