import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(props) {
    const pathName = props.props.location.pathname;
    return (
        <div className='Footer-container'>
            <ul className={pathName.slice(1, 10) === 'accounts/' || pathName === '/' ? 'Invalid' : ''}>
                <a href='https://rashad.dev' target="_blank" rel="noopener noreferrer">
                    <li>ABOUT US</li>
                </a>
                {/* <a href='https://rashad.dev' target="_blank" rel="noopener noreferrer">
                    <li>SUPPORT</li>
                </a>
                <a href='https://rashad.dev' target="_blank" rel="noopener noreferrer">
                    <li>PRESS</li>
                </a>
                <a href='https://rashad.dev' target="_blank" rel="noopener noreferrer">
                    <li>API</li>
                </a>
                <a href='https://rashad.dev' target="_blank" rel="noopener noreferrer">
                    <li>PRIVACY</li>
                </a>
                <a href='https://rashad.dev' target="_blank" rel="noopener noreferrer">
                    <li>TERMS</li>
                </a> */}
                <Link to='/directory/profiles/'>
                  <li>PROFILES</li>
                </Link>
            </ul>
            <p>© 2019 REACTAGRAM BY RASHAD</p>
        </div>
    )
}
