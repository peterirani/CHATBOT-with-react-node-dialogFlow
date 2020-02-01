import React from "react";
import {Link} from 'react-router-dom';

const Header = () => {
    return(
        <nav className={"nav-wrapper"}>
            <Link to={"/"} className={"brand-logo"}> Home</Link>
            <ul id={"nav-mobile"} className={"right hide-on-med-and-down"}>
                <li><Link to={"/shop"}> Shop </Link></li>
                <li><Link to={"/about"}> About </Link></li>
            </ul>
        </nav>
    )
};

export default Header;