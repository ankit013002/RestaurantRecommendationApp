import '../css/Navbar.css'
import { CiSettings } from "react-icons/ci";


function Navbar() {

    return (
        <div className="navbar-container">
            <div className="navbar-title">
                <a className='title' href="/">EasyEats</a>
            </div>
            <div className="navbar">
                <nav >
                    <ul className="navbar-list">
                        <li className="navbar-item">
                            <a href="/">Home</a>
                        </li>
                        <li className="navbar-item">
                            <a href="/">Popular</a>
                        </li>
                        <li className="navbar-item">
                            <a href="/results">Results</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="Setting-Profile">
                <CiSettings className='settings-icon'/>
                <div id="circle"></div>
            </div>
        </div>
    )
}

export default Navbar;