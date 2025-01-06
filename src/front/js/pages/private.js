import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("access_token");

        if (!token) {
            navigate("/login"); 
        }
    }, [navigate]);

    return (
        <div className="private-page">
            <h2>Welcome to the Private Page!</h2>
            <p>This content is only accessible for authenticated users.</p>
        </div>
    );
};

export default Private;