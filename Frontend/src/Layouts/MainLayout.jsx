import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className="font-poppins">
            <Toaster position="top-right" reverseOrder={false} />
            <header className="sticky top-0  bg-blue-500 shadow-sm z-10 dark:bg-neutral dark:text-white ">
                {/* Navbar */}
                <Navbar />
            </header>

            <main className="bg-neutralSilver dark:bg-gray-800 dark:text-white">
                {/* Dynamic Section  */}
                <div className="min-h-[calc(100vh-232px)]">
                    <Outlet />
                </div>
            </main>

            <footer>
                {/* Footer  */}
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout;
