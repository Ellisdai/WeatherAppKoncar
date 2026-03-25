import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";


type FormData = {
    username: string;
    email: string;
    password: string;
};

const Register: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
            await API.post("/auth/register", data);
            alert("Registration successful! Please login.");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("username")} placeholder="Username" required />
            <input {...register("email")} placeholder="Email" type="email" required />
            <input {...register("password")} placeholder="Password" type="password" required />
            <button type="submit">Register</button>
        </form>
        <button onClick={() => navigate("/")}>Already have an account? Login</button>
        </div>
    );
}

export default Register;