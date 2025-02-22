import { useContext, useEffect, useState } from 'react';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
// import userIcon from '../assets/user.png';
// import logo from '../assets/frame.png';
import { AuthContext } from '../provider/AuthProvider';
// import Login from './../pages/Login';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const [mode, setMode] = useState('light');

    // Load theme from local storage on mount
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setMode(storedTheme);
            document.documentElement.classList.add(storedTheme);
        }
    }, []);

    // Toggle Mode Function
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            setMode('light');
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
    };


    return (
        <div className="navbar container mx-auto px-3 py-1 ">
            <div className="navbar-start">
                {/* <img src={logo} alt="logo" className="w-14 rounded-md" /> */}
                <h2 className="text-xl font-semibold text-white">Quick Task</h2>
            </div>

            {/* login / logout functionality */}
            <div className="navbar-end md:flex gap-2">

                {/* DarkMode Light Mode  */}
                <div>
                    {mode === 'light' ? (
                        <button onClick={toggleMode}>
                            <span className="text-3xl text-yellow-500">
                                <IoSunnyOutline />
                            </span>
                        </button>
                    ) : (
                        <button onClick={toggleMode}>
                            <span className="text-3xl text-gray-500">
                                <IoMoonOutline />
                            </span>
                        </button>
                    )}
                </div>



                {user && user?.email ? (
                        <div className="dropdown dropdown-end flex items-center gap-3">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn  btn-circle avatar "
                        >
                            <div className="w-10 rounded-full border-2 border-green-600">
                            <img
                                alt="User Profile"
                                
                                src={
                                user?.photoURL
                                    ? user.photoURL
                                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                                className="object-cover w-full h-full"
                            />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50] mt-56 w-52 p-2 shadow"
                        >
                            <div className=" border-b px-4 ">
                            <div>
                                <h2 className="text-orange-400 pt-3 font-bold rounded-lg text-center text-md  ">
                                {user.displayName}
                                </h2>
                                <h2 className="text-orange-400   rounded-lg text-center text-xs mb-3  ">
                                {user.email}
                                </h2>
                            </div>
                            </div>
                            

                            <li
                            onClick={() => {
                                if (window.confirm("Are you sure you want to log out?")) {
                                    logOut();
                                }
                            }}
                            className="text-red-500 font-semibold"
                            >
                            <Link to="/">Logout</Link>
                            </li>
                        </ul>
                        </div>
                    ) : (
                        <Link
                        to="/auth/login"
                        className="btn  py-2 px-4 md:px-7 hover:bg-gray-700 text-[#80CDC3]  font-Oswald uppercase"
                    >
                        Login
                    </Link>
                    )}





                
                {/* user image  */}
                {/* <div>
                    {user && user?.email ? (
                        <div className="relative flex items-center gap-2 group">
                            <Link className="flex lg:ml-10 items-center gap-2">
                                <img className="w-14 h-14 rounded-full object-cover object-center" src={user?.photoURL} alt="" />
                            </Link>
                            <span className="absolute min-w-48 top-full right-0 lg:-right-10 mt-2 bg-brandLight text-brandPrimary font-bold border border-gray-200 rounded shadow-md p-3 text-sm hidden group-hover:block">
                                {user.displayName}
                            </span>
                        </div>
                    ) : (
                        <img className="rounded-full" src={userIcon} alt="user" />
                    )}
                </div> */}

                {/* <div className="lg:flex">
                    {user && user?.email ? (
                        <button onClick={logOut} className="btn bg-brandPrimary text-brandLight hover:text-brandPrimary font-semibold">
                        Log Out
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/auth/login" className="btn bg-brandPrimary text-brandLight hover:text-brandPrimary font-bold">
                                Login
                            </Link>
                            <Link to="/auth/register" className="btn bg-brandSecondary text-brandLight hover:text-brandSecondary font-bold">
                                Register
                            </Link>
                        </div>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default Navbar;
