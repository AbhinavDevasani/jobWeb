import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../Context/AuthContext";
import Cookies from "js-cookie";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";

const AuthPage = ({ initialMode = "login" }) => {
    const [isSignUp, setIsSignUp] = useState(initialMode === "register");
    const { login, register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regError, setRegError] = useState("");
    const [regSuccess, setRegSuccess] = useState("");
    const [regLoading, setRegLoading] = useState(false);
    const [showRegPassword, setShowRegPassword] = useState(false);
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    useEffect(() => {
        const token = Cookies.get("jwt_token");
        if (token) navigate("/home");
    }, [navigate]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoginLoading(true);
            setLoginError("");
            await login(loginEmail, loginPassword);
            navigate("/home");
        } catch (err) {
            setLoginError(err.message || "Invalid email or password");
        } finally {
            setLoginLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            setRegLoading(true);
            setRegError("");
            await register(regName, regEmail, regPassword);
            setRegSuccess("Registration successful! Please sign in.");
            setTimeout(() => {
                setIsSignUp(false);
                setRegName("");
                setRegEmail("");
                setRegPassword("");
            }, 2000);
        } catch (err) {
            setRegError(err.message || "Registration failed");
        } finally {
            setRegLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#f5f9fc] ">
            <div className="w-1/2 flex items-center justify-center px-20">

                <div className="w-full max-w-md">

                    <h2 className="text-3xl font-bold text-[#2da6df] mb-2">
                        {isSignUp ? "Create Account" : "Sign in"}
                    </h2>

                    <p className="text-gray-500 mb-8">
                        {isSignUp
                            ? "Create your account to get started"
                            : "Enter your details below to access your account"}
                    </p>
                    {isSignUp ? (
                        <form onSubmit={handleRegisterSubmit} className="space-y-5">

                            {regError && (
                                <p className="text-red-500 text-sm">{regError}</p>
                            )}
                            {regSuccess && (
                                <p className="text-green-500 text-sm">{regSuccess}</p>
                            )}

                            <div className="flex items-center border rounded-lg px-3 py-2">
                                <FaRegUser className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full outline-none"
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex items-center border rounded-lg px-3 py-2">
                                <MdOutlineMail className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full outline-none"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex items-center border rounded-lg px-3 py-2">
                                <RiLockPasswordLine className="text-gray-400 mr-2" />
                                <input
                                    type={showRegPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full outline-none"
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowRegPassword(!showRegPassword)}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showRegPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={regLoading}
                                className="w-full bg-[#2da6df] text-white py-3 rounded-lg hover:bg-[#1e8cc4] transition"
                            >
                                {regLoading ? "Signing Up..." : "Sign Up"}
                            </button>

                            <p className="text-sm text-center text-gray-600 mt-4">
                                Already have an account?{" "}
                                <span
                                    onClick={() => setIsSignUp(false)}
                                    className="text-[#2da6df] cursor-pointer font-medium"
                                >
                                    Sign in
                                </span>
                            </p>

                        </form>
                    ) : (
                        <form onSubmit={handleLoginSubmit} className="space-y-5">

                            {loginError && (
                                <p className="text-red-500 text-sm">{loginError}</p>
                            )}

                            <div className="flex items-center border rounded-lg px-3 py-2">
                                <MdOutlineMail className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full outline-none"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex items-center border rounded-lg px-3 py-2">
                                <RiLockPasswordLine className="text-gray-400 mr-2" />
                                <input
                                    type={showLoginPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full outline-none"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full bg-[#2da6df] text-white py-3 rounded-lg hover:bg-[#1e8cc4] transition"
                            >
                                {loginLoading ? "Signing In..." : "Sign In"}
                            </button>

                            <p className="text-sm text-center text-gray-600 mt-4">
                                Don't have an account?{" "}
                                <span
                                    onClick={() => setIsSignUp(true)}
                                    className="text-[#2da6df] cursor-pointer font-medium"
                                >
                                    Sign up
                                </span>
                            </p>

                        </form>
                    )}

                </div>
            </div>
            <div className="w-1/2 bg-white flex items-center justify-center">
                <img
                    src="https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg"
                    alt="Job Portal"
                    className="w-[70%] object-contain"
                />
            </div>

        </div>
    );
};

export default AuthPage;