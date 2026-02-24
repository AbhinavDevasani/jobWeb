
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../Context/AuthContext';
import Cookies from 'js-cookie';
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

const AuthPage = ({ initialMode = 'login' }) => {
    const [isSignUp, setIsSignUp] = useState(initialMode === 'register');
    const { login, register } = useContext(AuthContext);
    const navigate = useNavigate();

    // Login State
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    // Register State
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regError, setRegError] = useState("");
    const [regSuccess, setRegSuccess] = useState("");
    const [regLoading, setRegLoading] = useState(false);

    useEffect(() => {
        setIsSignUp(initialMode === 'register');
    }, [initialMode]);

    useEffect(() => {
        const token = Cookies.get("jwt_token");
        if (token) {
            navigate("/home");
        }
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
            setRegSuccess("");
            await register(regName, regEmail, regPassword);
            setRegSuccess("Registration successful! Please sign in.");
            // Optional: Switch to login view after delay
            setTimeout(() => {
                setIsSignUp(false);
                setRegSuccess("");
                setRegName("");
                setRegEmail("");
                setRegPassword("");
            }, 2000);

        } catch (err) {
            setRegError(err.message || "Failed to register. Try again.");
        } finally {
            setRegLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-['Open_Sans']">
            <div className={`relative overflow-hidden w-[900px] max-w-full h-[550px] bg-white rounded-[20px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] transform transition-all duration-1000 ease-in-out ${isSignUp ? 'right-panel-active' : ''}`}>

                {/* Sign Up Container */}
                <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-10 text-center transition-all duration-1000 ease-in-out ${isSignUp ? 'translate-x-full opacity-100 z-5' : 'opacity-0 z-1'}`}>
                    <form onSubmit={handleRegisterSubmit} className="flex flex-col items-center justify-center w-full h-full bg-white">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Create Account</h2>
                        {regError && <p className="text-red-500 text-sm mb-2">{regError}</p>}
                        {regSuccess && <p className="text-green-500 text-sm mb-2">{regSuccess}</p>}

                        <label className="w-full max-w-[260px] mx-auto mb-4">
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <FaRegUser className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="w-full max-w-[260px] mx-auto mb-4">
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <MdOutlineMail className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="w-full max-w-[260px] mx-auto mb-6">
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <RiLockPasswordLine className="text-gray-400 mr-2" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </label>

                        <button
                            type="submit"
                            disabled={regLoading}
                            className="rounded-[20px] border border-[#d4af7a] bg-[#d4af7a] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider cursor-pointer hover:bg-[#c09e6b] transition-colors disabled:opacity-50 mt-4"
                        >
                            {regLoading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                </div>

                {/* Sign In Container */}
                <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-10 text-center transition-all duration-1000 ease-in-out z-2 ${isSignUp ? 'translate-x-full' : ''}`}>
                    <form onSubmit={handleLoginSubmit} className="flex flex-col items-center justify-center w-full h-full bg-white">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome</h2>
                        {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}

                        <label className="w-full max-w-[260px] mx-auto mb-4">
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <MdOutlineMail className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="w-full max-w-[260px] mx-auto mb-4">
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <RiLockPasswordLine className="text-gray-400 mr-2" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </label>

                        {/* <p className="text-xs text-gray-500 my-4 cursor-pointer hover:text-gray-800">Forgot password?</p> */}

                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="rounded-[20px] border border-[#d4af7a] bg-[#d4af7a] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider cursor-pointer hover:bg-[#c09e6b] transition-colors disabled:opacity-50 mt-8"
                        >
                            {loginLoading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                </div>

                {/* Overlay Container */}
                <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-1000 ease-in-out z-100 ${isSignUp ? '-translate-x-full' : ''}`}>
                    <div className={`bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] text-white relative -left-full h-full w-[200%] transform transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}>

                        {/* Background Image Layer */}
                        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-80" style={{ backgroundImage: 'url("https://media.istockphoto.com/id/1389686737/photo/here-is-my-resume.jpg?s=612x612&w=0&k=20&c=MIWZdiJPtsf6fgy8Mhtp2yXvnA3tVFle7qt0zbv5UDY=")' }}></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>


                        {/* Overlay Panels */}
                        <div className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 text-center px-10 transform transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-0' : '-translate-x-[20%]'}`}>
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Don't have an account? Please Sign up!</h3>
                            <button
                                className="relative z-10 rounded-[20px] border border-white bg-transparent text-white text-xs font-bold py-3 px-11 uppercase tracking-wider cursor-pointer hover:bg-white hover:text-[#d4af7a] transition-colors"
                                onClick={() => setIsSignUp(false)}
                            >
                                Sign In
                            </button>
                        </div>

                        <div className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 text-center px-10 transform transition-transform duration-1000 ease-in-out ${isSignUp ? 'translate-x-[20%]' : 'translate-x-0'}`}>
                            <h3 className="text-2xl font-bold mb-4 relative z-10">If you already has an account, just sign in.</h3>
                            <button
                                className="relative z-10 rounded-[20px] border border-white bg-transparent text-white text-xs font-bold py-3 px-11 uppercase tracking-wider cursor-pointer hover:bg-white hover:text-[#d4af7a] transition-colors"
                                onClick={() => setIsSignUp(true)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
