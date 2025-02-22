import { FaGithub, FaInstalod, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/frame.png';

const Footer = () => {
    return (
        <footer className="footer bg-neutral text-neutral-content p-10">
            <aside>
                <img src={logo} alt="logo" className="w-14" />
                <p>
                    Task Management
                    <br />
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <Link to="https://github.com/DeveloperMonirBD" target="_blank" rel="noopener noreferrer" className="bg-brandPrimary  p-2 rounded-full hover:text-gray-300">
                        <FaGithub />
                    </Link>

                    <Link to="https://www.linkedin.com/in/monirdeveloper" target="_blank" rel="noopener noreferrer" className="bg-brandPrimary  p-2 rounded-full hover:text-gray-300">
                        <FaLinkedin />
                    </Link>

                    <Link to="https://x.com/Monir_Developer" target="_blank" rel="noopener noreferrer" className="bg-brandPrimary  p-2 rounded-full hover:text-gray-300">
                        <FaTwitter />
                    </Link>

                    <Link to="https://www.instagram.com/monirdeveloper" target="_blank" rel="noopener noreferrer" className=" bg-brandPrimary  p-2 rounded-full hover:text-gray-300">
                        <FaInstalod />
                    </Link>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
