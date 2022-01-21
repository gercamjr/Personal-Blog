import React from 'react';
import '../styles/styles.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div class="sandbox sandbox-clean-and-grimey">
                <a id="logo" href="/" alt="home">
			        <img src={`${process.env.PUBLIC_URL}/img/no-hay-LOGO.svg`} alt="logo image" />
			        <img className="pedo" src={`${process.env.PUBLIC_URL}/img/pedo-LOGO.svg`} alt="" />
		        </a>
            </div>
        </nav>
    )
}