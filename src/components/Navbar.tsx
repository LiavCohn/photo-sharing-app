import { FaPlus, FaReddit, FaUser } from "react-icons/fa"
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react"
import { Link, useNavigate } from "react-router-dom"
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import Dropdown from "./Dropdown";
import "../styles/Navbar.css"
import { useState } from "react"



const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const { user } = useUser() //get current user
    const navigate = useNavigate()
    return <nav className="navbar">
        <div className="navbar-content">
            <Link to="/">
                <span className="site-name">Photo Sharing</span>
            </Link>
            <Link to="/upload" className="logo-link">
                <div className="logo-container">
                    Upload Pic
                    <FaPlus></FaPlus>
                </div>
            </Link>
            <div>Search Your Pics</div>
            <div className="nav-actions">
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="sign-in-button">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    {/* <div className="dropdown-container">
                        <button className="icon-button" onClick={() => setShowDropdown(true)}>
                            <FaPlus></FaPlus>
                        </button>
                        {showDropdown && <Dropdown isOpen={showDropdown} onClose={() => setShowDropdown(false)}/>}
                    </div> */}
                    <button className="icon-button" onClick={() => user?.username && navigate(`/u/${user.username}`)} title="View Profile">
                        <FaUser></FaUser>
                    </button>
                    <UserButton></UserButton>
                </SignedIn>
            </div>
        </div>
    </nav>
}

export default Navbar