import React, { useState } from 'react';
import Reactagram from './svgs/Reactagram';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Signup(props) {
    const [invalidAction, setInvalidAction] = useState({attempt: false});


    const handleClick = (e) => {
        e.preventDefault();

        setInvalidAction({attempt: true})
        setTimeout( () => { props.history.push('/rashad') }, 2000 )
    }
    const deviceGallery = () => {
        return (
            <div className="Device-gallery">
                        <div className="Device-gallery-slideshow"></div>
             </div>
        )
    }

    const message = () => {
        return (
            <div>
                <center>
                     <p style={{color: 'red'}}> Sorry this feature isn't availble yet, but it will be soon!</p>
                </center>
            </div>
        )
    }
    return (
        <React.Fragment>
            <Helmet>
                <meta charSet='utf-8' />
                <title> {props.location.pathname !== '/' ? 'Sign up • Reactagram' : 'Reactagram'}</title>
            </Helmet>
            <div className='Form-container'>
                    {
                        props.location.pathname === '/' && deviceGallery()
                    }
                <div className='Form-panel-outer'>
                    <form className='Form-panel-upper Form-div'>
                        <h1 className='Form-title'>Reactagram</h1>
                        <Reactagram />
                        <p className='Form-blurb Signup'>Sign up to see photos from your friends.</p>
                        <input type='email' name='' id='' arialabel='email' placeholder='Email' className='Input-field'/>
                        <input type='text' arialabel='name' placeholder='Name' className='Input-field'/>
                        <input type='text' autoComplete='username' arialabel='username' placeholder='Username' className='Input-field'/>
                        <input type='password' placeholder='Password' arialabel='password' autoComplete='current-password' className='Input-field'/>
                        <button arialabel='Sign up' className={`Form-button Sign-up ${invalidAction.attempt ? 'Invalid-action' : ''}`} onClick={ (e) => handleClick(e)}>Sign Up</button>
                        {
                            invalidAction.attempt ? message() : <p className='Lower-blurb'>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
                        }
                    </form>
                    <div className='Form-panel-lower Form-div'><p>Have an account? </p><Link to="/accounts/login"> Log In</Link></div>
                </div>
            </div>
        </React.Fragment>
    )
}