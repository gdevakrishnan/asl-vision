import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Hand } from 'lucide-react';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton,
    UserButton,
} from '@clerk/clerk-react';

const DotIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
        </svg>
    )
}

const Navbar = () => {
    return (
        <Fragment>
            <header className="header-nav">
                <nav>
                    <Link to="/" className="underline-none">
                        <h1>ISL VISION</h1>
                    </Link>

                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>

                        {/* 🔐 Only show Learn & Practice if signed in */}
                        <SignedIn>
                            <li>
                                <Link to="/learn">Learn</Link>
                            </li>
                            <li>
                                <Link to="/practice">Practice</Link>
                            </li>
                            <li>
                                <Link to="/play">Play</Link>
                            </li>
                        </SignedIn>

                        {/* 👤 Show Sign In if signed out */}
                        <SignedOut>
                            <li>
                                <SignInButton mode="modal">
                                    <button className='nav-btn'>Sign In</button>
                                </SignInButton>
                            </li>
                        </SignedOut>

                        {/* 🔓 Show Sign Out if signed in */}
                        <SignedIn>
                            <li>
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: {
                                                width: '40px',
                                                height: '40px',
                                            },
                                        },
                                    }}
                                />
                            </li>
                            <li>
                                <SignOutButton>
                                    <button className='nav-btn'>Sign Out</button>
                                </SignOutButton>
                            </li>
                        </SignedIn>
                    </ul>
                </nav>
            </header>
        </Fragment>
    );
};

export default Navbar;