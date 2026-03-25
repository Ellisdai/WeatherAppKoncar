import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

type FormData = {
    email: string;
    password: string;
    username: string;
};

const Login: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
            console.log("Calling:", API.defaults.baseURL + "/auth/login");
            const res = await API.post("/auth/login", data);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("username")} placeholder="Username" required />
            <input {...register("email")} placeholder="Email" type="email" required />
            <input {...register("password")} placeholder="Password" type="password" required />
            <button type="submit">Login</button>
        </form>

        <button onClick={() => navigate("/register")}>Don't have an account? Register</button>
        </div>
    );
}

export default Login;