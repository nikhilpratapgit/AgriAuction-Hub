import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const Verify = () => {
    const { token } = useParams();
    const [status, setStatus] = useState("Verifying...");
    const navigate = useNavigate();
    console.log(token)
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/v1/users/verify-email/${token}`);
                if (res.data.success) {
                    console.log(res.data)
                    setStatus("Email verified successfully!");
                    toast.success("Email verified!");
                    setTimeout(() => navigate("/login"), 2000);
                }
            } catch (err) {
                setStatus("Verification failed or link expired.");
                toast.error(err.response?.data?.message || "Verification failed.");
            }
        };

        if (token) {
            verifyEmail();
        } else {
            setStatus("No token found.");
        }
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Email Verification</h2>
                <p className="text-gray-700">{status}</p>
            </div>
        </div>
    );
};

export default Verify;
