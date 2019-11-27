import React from 'react';
import Reactagram from './svgs/Reactagram';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <React.Fragment>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Login • Reactagram</title>
            </Helmet>
            <div className='Form-container'>
                <div className='Form-panel-outer'>
                    <form className='Form-panel-upper Form-div'>
                        <h1 className='Form-title'>Reactagram</h1>
                        <Reactagram />
                        <input type='email' name='' id='' autoComplete='username' arialabel='username or email'placeholder='Username or email' className='Input-field'/>
                        <input type='password' autoComplete='current-password' placeholder='Password' className='Input-field'/>
                        <button className='Form-button'>Log In</button>
                        <hr/>
                        <p className='Or'>OR</p>
                        <p className='Forgot-password'>Forgot password?</p>
                    </form>
                    <div className='Form-panel-lower Form-div'><p>Dont'have an account? </p><Link to="/accounts/signup"> Sign Up</Link></div>
                </div>
            </div>
        </React.Fragment>
    )
}