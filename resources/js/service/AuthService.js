import React from "react";
import axios from "axios";

function Login(val) {
    return axios.post('api/auth', val)
}

async function Logout(val) {
    const rest = await axios.post('api/auth/logout', val, {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${val.token}`
        }
    })
    return rest
}

const AuthService = {
    Login,
    Logout,
}

export default AuthService;