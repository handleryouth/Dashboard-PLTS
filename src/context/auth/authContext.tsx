import { ReactNode, createContext, useReducer, useContext } from "react";

export interface Action {
  type: "add" | "remove";
  payload: string;
}

export type Dispatch = (action: Action) => void;

export interface State {
  accessToken: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthStateContextProps {
  state: State;
  dispatch: Dispatch;
}

const AuthStateContext = createContext<AuthStateContextProps | undefined>(
  undefined
);

function authReducer(_state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      return { accessToken: action.payload };
    }
    case "remove": {
      return { accessToken: "" };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, { accessToken: "" });
  const value = { state, dispatch };

  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
