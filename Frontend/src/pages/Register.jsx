import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useContext, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash,  } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { GrGoogle } from "react-icons/gr";
import { AuthContext } from '../provider/AuthProvider';

const Register = () => {
    const { createNewUser, setUser, updateUserProfile, auth } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        // get form data
        const form = new FormData(e.target);
        const name = form.get('name');

        if (name.length < 5) {
            setError({ ...error, name: 'Must be more than 5 character length' });
            return;
        }

        const email = form.get('email');
        const photo = form.get('photo');
        const terms = e.target.terms.checked;

        // reset error and status
        setErrorMessage('');
        setSuccess(false);

        if (!terms) {
            setErrorMessage('Please accept our terms and conditions.');
            toast.error('Please accept our terms and conditions.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password should be 6 characters or longer.');
            toast.error('Password should be 6 characters or longer.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            toast.error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            toast.error('Passwords do not match.');
            return;
        }

        createNewUser(email, password)
            .then(result => {
                const user = result.user;
                setSuccess(true);
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        navigate(location?.state ? location.state : '/');
                        toast.success('Registration successful!');
                    })
                    .catch(err => {
                        toast.error(err.message);
                    });
            })
            .catch(error => {
                const errorMessage = error.message;
                setSuccess(false);
                toast.error(`Error: ${errorMessage}`);
                setErrorMessage(errorMessage);
            });
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(() => {
                navigate(location?.state ? location.state : '/');
                toast.success('Successfully signed in with Google!');
            })
            .catch(err => {
                toast.error(`Google sign-in failed: ${err.message}`);
            });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="md:min-h-screen p-3 flex justify-center items-center dark:bg-[#000000] dark:text-white ">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-sm md:p-2 border dark:bg-[#1E1E1E] dark:text-white">
                <h2 className="text-2xl md:text-3xl text-[#010d78] dark:text-white font-semibold text-center pt-10">Register your account</h2>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base text-[#010d78]  dark:text-white">Your Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Enter your name" className="input border-[#010d78] dark:border-white bg-[#F3F3F3] dark:bg-neutral dark:text-white" required />
                    </div>
                    {error.name && <label className="label text-sm text-rose-500">{error.name}</label>}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base text-[#010d78] dark:text-white">Photo URL</span>
                        </label>
                        <input type="text" name="photo" placeholder="Enter your photo URL" className="input border-[#010d78] dark:border-white bg-[#F3F3F3] dark:bg-neutral dark:text-white" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base text-[#010d78] dark:text-white">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Enter your email" className="input border-[#010d78] dark:border-white bg-[#F3F3F3] dark:bg-neutral dark:text-white" required />
                    </div>

                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-base text-[#010d78] dark:text-white">Password</span>
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter password"
                            className="input border-[#010d78] dark:border-white bg-[#F3F3F3] dark:bg-neutral dark:text-white"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button type="button" onClick={handleShowPassword} className="btn btn-xs absolute right-3 text-lg top-12 dark:bg-neutral dark:text-white">
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-base text-[#010d78] dark:text-white">Confirm Password</span>
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm password"
                            className="input border-[#010d78] dark:border-white bg-[#F3F3F3] dark:bg-neutral dark:text-white"
                            required
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <button type="button" onClick={handleShowConfirmPassword} className="btn btn-xs absolute right-3 text-lg top-12  dark:bg-neutral dark:text-white">
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <input className="w-5" type="checkbox" name="terms" />
                        <a href='#' className="text-gray-500  text-base">
                            Accept <span className="text-[#010d78] dark:text-white">Terms & Conditions</span>
                        </a>
                    </div>
                    <div className="form-control mt-2">
                        <button className="btn text-white bg-[#010d78] dark:bg-white dark:text-gray-900 hover:bg-[#010d78] hover:text-white btn-neutral">Register</button>
                    </div>
                    {/* <div className="form-control mt-6">
                        <button className="btn text-white text-base btn-neutral">Register</button>
                    </div> */}

                    {errorMessage && <p className="text-red-600 text-center mt-3">{errorMessage}</p>}

                    {success && <p className="text-green-500 text-center mt-3">Sign up is Successful.</p>}

                    
                    <div className="form-control mt-2 flex justify-center gap-3">
                        <button type="button" onClick={handleGoogleLogin} className="btn text-base bg-white dark:bg-neutral dark:border-white dark:text-white hover:bg-[#010d78] border-[#010d78] hover:text-white">
                        <GrGoogle /> Google Login
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 font-semibold pb-10">
                    <span>Already have an account? </span>
                    <Link className="text-[#010d78] dark:text-white link-hover" to="/auth/login">
                        Login
                    </Link>
                </p>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

export default Register;
