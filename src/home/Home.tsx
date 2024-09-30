import { Button } from "antd";
import React from "react";

export function Home() {

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        window.location.reload();
    }

    return (
        <div>
            Gay
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}