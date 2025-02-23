import { GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import { useContext, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../provider/AuthProvider';
import { GrGoogle } from "react-icons/gr";

import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
    const { userLogin, setUser, auth } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef();

    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');

        userLogin(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                navigate(location?.state ? location.state : '/');
                toast.success('Successfully logged in!');
            })
            .catch(err => {
                setError({ ...error, login: err.code });
                toast.error(`Error: ${err.message}`);
            });
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(() => {
                navigate(location?.state ? location.state : '/');
                toast.success('Successfully logged in with Google!');
            })
            .catch(err => {
                toast.error(`Google login failed: ${err.message}`);
            });
    };

    const handleForgetPassword = () => {
        const email = emailRef.current.value;

        if (!email) {
            toast.error('Please provide a valid email address');
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast.success('Password reset email sent, please check your email');
                })
                .catch(err => {
                    toast.error(`Error: ${err.message}`);
                });
        }
    };

    return (
        <div className="md:min-h-[calc(100vh-200px)] p-3 flex justify-center items-center dark:bg-[#000000] dark:text-white py-6">
            <div className="card bg-base-100 w-full border border-white max-w-md shrink-0 shadow-sm md:p-3  dark:bg-[#1E1E1E] dark:text-white">
                <h2 className="text-2xl md:text-3xl font-semibold text-center dark:text-white text-[#010d78] pt-3">Login your account</h2>
                <form onSubmit={handleSubmit} className="card-body ">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#010d78] dark:text-white">Email</span>
                        </label>
                        <input type="email" name="email" ref={emailRef} placeholder="Email or Username" className="input  border-[#010d78] dark:border-white dark:bg-neutral dark:text-white" required />
                    </div>

                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-[#010d78]  dark:text-white">Password</span>
                        </label>

                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="******"
                            className="input border-[#010d78] dark:border-white dark:bg-neutral dark:text-white"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}  className="btn btn-xs absolute right-3 text-lg top-12 dark:bg-neutral dark:text-white">
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>

                        {error.login && <label className="label text-red-600 text-sm">{error.login}</label>}

                        <label onClick={handleForgetPassword} className="label">
                            <Link to="#" className="label-text-alt link link-hover text-red-500 dark:text-white">
                                Forgot password?
                            </Link>
                        </label>
                    </div>
                    <div className="form-control mt-2">
                        <button className="btn text-white bg-[#010d78] hover:bg-gray-200 hover:text-[#010d78] btn-neutral">Login</button>
                    </div>

                    <div className="form-control mt-2 flex justify-center gap-3">
                        <button type="button" onClick={handleGoogleLogin} className="btn text-base bg-white dark:bg-neutral dark:border-white dark:text-white hover:bg-[#010d78] border-[#010d78] hover:text-white">
                        <GrGoogle /> Google Login
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-500  pb-4">
                    <span>Don’t Have An Account ? </span>
                    <Link className="text-[#010d78] dark:text-white link-hover" to="/auth/register">
                        Register
                    </Link>
                </p>
            </div>

            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

export default Login;
