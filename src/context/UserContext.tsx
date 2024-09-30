import React from "react";

export const UserContext = React.createContext({} as any);

export function UserProvider({ children }: any) {

    const [user, setUser] = React.useState({});
    const [token, setToken] = React.useState('');

    return (
        <UserContext.Provider value={{ token, user, setUser, setToken }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => React.useContext(UserContext);