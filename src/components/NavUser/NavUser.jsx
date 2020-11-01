import React from "react"
import { Link } from "react-router-dom"

function NavUser({ logOut }) {
  return (
    <nav className="main-navigation">
        <uL>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/new-project"> New Project</Link></li>
            <li><Link to="/" onClick={logOut}>Log Out</Link></li>
        </uL>
    </nav>
  );
}

export default NavUser;