import React, { useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [data, setData] = useState({
        email: "",
        profile_picture: "",
        first_name: "",
        last_name: "",
        created_at: "",
        username: "",
        userId: "",
        pin: {},
        pk: "",
        walletAddress: "",
        password: "",
        backup: "",
        check_textInputChange: false,
        secureTextEntry: true,
        isRestore: false,
        isValidUser: true,
        isValidPassword: true,
    });
    return (
        <UserContext.Provider value={{ data, setData }}>
            {children}
        </UserContext.Provider>
    );
};
