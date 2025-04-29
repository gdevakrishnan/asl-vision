import { Hand } from 'lucide-react'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <Fragment>
            <header className='header-nav'>
                <nav>
                    <Link to={'/'} className='underline-none'>
                        <h1>ASL VISION</h1>
                    </Link>

                    <ul>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/about'}>About</Link>
                        </li>
                        <li>
                            <Link to={'/learn'}>Learn</Link>
                        </li>
                        <li>
                            <Link to={'/practice'}>Practice</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </Fragment>
    )
}

export default Navbar
