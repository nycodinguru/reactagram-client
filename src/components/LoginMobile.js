import React, { useState } from 'react';
import Reactagram from './svgs/Reactagram';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function LoginMobile(props) {
    const [renderWelcomeMessage, setRenderWelcomeMessage] = useState({ render: true });
    const [menuState, setMenuState] = useState({open: false});
    const [invalidAction, setInvalidAction] = useState({ attempt: false });

    const closeWelcomeMessage = () => {
        setTimeout(() => { 
            document.body.style.overflow = "scroll"; 
            setRenderWelcomeMessage({ render: false }) 
        }, 400)
    }

    const routeTo = (e, route) => {
        e.preventDefault()
        const rerouteTimeout = setTimeout(() => {props.history.push(`/${route}`)}, 400);
        clearTimeout(rerouteTimeout)
    }

    const toggleMenu = () => {
        if (menuState.open)setMenuState({open: false})
        else {setMenuState({open: true})}
    }

    const handleClick = () => {
        setInvalidAction({ attempt: true })
        setTimeout(() => {setInvalidAction({ attempt: false })}, 4200);
    }

    const renderMenu = () => {
        return (
            <div className='Options-menu'>
                <div className='Options-menu-close-button' onClick={ () => toggleMenu()}>
                <svg aria-label="Close" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg>
                </div>
                <div className='Options-menu-header'>Options</div>
                <ul className='Options-menu-list'>
                    <li className='Options-menu-list-item header'>OPTIONS</li>
                    <Link to='/accounts/signup'>
                        <li className='Options-menu-list-item'>Sign Up</li>
                    </Link>
                    <Link to='/accounts/login'>
                        <li className='Options-menu-list-item'>Log In</li>
                    </Link>
                    <li className='Options-menu-list-item Invalid'>Download App</li>
                </ul>
                <ul className='Options-menu-list'>
                    <li className='Options-menu-list-item header'>ABOUT</li>
                    <a href='https://rashad.dev' target="_blank" rel="noopener noreferrer">
                        <li className='Options-menu-list-item'>About Us</li>
                    </a>
                    <Link to='/directory/profiles/'>
                        <li className='Options-menu-list-item'>Profiles</li>
                    </Link>
                </ul>
            </div>
        )
    }


    const initReRoute = setTimeout(function(){ 
            props.history.push('/rashad');
            document.body.style.overflow = "scroll"; 
        }, 16000);

    const welcomeMessage = (cn) => {
        document.body.style.overflow = "hidden";
        return (
            <React.Fragment>
                <div className={`Welcome-message-container ${cn ? cn : ''}`}>
                    <div className='Close-button' onClick={() => closeWelcomeMessage()}>×</div>
                    <div className='Logo'> </div>
                    <div className='Message-parent'>
                        <h4> Welcome to Reactagram!</h4>
                        <p> While auth is being implemented feel free to browse around. A directory containing a direct link to every profile is linked in the footer, however profiles can also be searched for in the navbar (when not on a mobile device). You'll be redirected shortly...</p>
                    </div>
                    <div className='Form-button' id='Button' onClick={() => closeWelcomeMessage()}>Got It</div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Reactagram</title>
            </Helmet>
            <div className='Form-container Login-Mobile' onLoad={ () => initReRoute()}>
                <div className="Menu-button" onClick={ () => toggleMenu()}>...</div>
                {
                    menuState.open && renderMenu()
                }
                {
                    props.location.pathname === '/' && renderWelcomeMessage.render && welcomeMessage()
                }
                <div className='Form-panel-outer'>
                    <form className='Form-panel-upper Form-div'>
                        <h1 className='Form-title'>Reactagram</h1>
                        <Reactagram />
                        <p className='blurb'>Sign up to see photos from your friends.</p>
                        <button className='Form-button' onClick={ (e, route='accounts/login') => routeTo(e, route)}>Log In</button>
                        <hr/>
                        <p className='Or'>OR</p>
                        <p className={`Sign-up ${invalidAction.attempt ? 'Invalid-action' : ''}`} onClick={() => handleClick()}> Sign Up</p>
                        {
                            invalidAction.attempt && <p style={{ color: 'red', marginTop: '10px', fontSize: '0.8rem' }}> Sorry this feature isn't available yet.</p>
                        }
                    </form>
                </div>
            </div>
            
        </React.Fragment>
    )
}