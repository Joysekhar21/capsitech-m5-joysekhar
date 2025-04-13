import { createContext } from "react";

export const UserContext = createContext({
    user: {
        name: "",
        email: "",
        password: "",
        avatar: "",
    },
    loading: false,
    isLoggedIn: false,
    loginModal: false,
    setLoading: () => {},
    setLoginModal: () => { },
    setIsLoggedIn: () => { },
    fetchUser: () => { },
    updateDetails: () => { },
    updatePassword: () => { },
    updateAvatar: () => { },
    userLogin: () => { },
    userRegister: () => { },
    setUser: () => { },
    removeAvatar: () => { }
})