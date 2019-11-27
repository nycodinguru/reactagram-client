import React from 'react';

export default function LoginModal(props) {
    const routeTo = (route) => {
        document.body.style.overflow = "scroll"
        props.props.history.push(`/${route}`)
    }

    const followMessage = () => {
        return (
            <React.Fragment>
                <div className='Follow-icon-parent'>
                        <div className='Follow-icon'></div>
                        <div className='Follow-profile-picture' style={{backgroundImage: `url(${props.imgurl})`}}></div>
                    </div>
                <p className=''>Log in to follow.</p>
            </React.Fragment>
        )
    }

    const connectMessage = () => {
        return (
            <React.Fragment>
                <div className='Follow-icon-parent Connect'>
                        <div className='Connect-icon'></div>
                    </div>
                <p style={{fontSize: '0.85rem'}}>Log in to connect with your world on Reactagram.</p>
            </React.Fragment>
        )
    }

    return (
        <div 
            className={`Login-modal-container ${ props.modalClass.open ? 'Open' : ''}`}
            onClick={ (e) => props.closeModal(e) }> 
            <div className={`Login-modal ${props.loginModal.trigger === 'follow' ? '' : 'Connect'}`}>
                <hr className="Close-toggle"/>
               {
                   props.loginModal.trigger === 'follow' ? followMessage() : connectMessage()
               }
                <div className='Login-modal-buttons-parent'>
                    <div className='Form-button Login-button' onClick={ () => routeTo('accounts/login')}>Log in</div>
                    <div className='Signup-button' onClick={ () => routeTo('accounts/signup')}>Sign Up</div>
                    <div className='Not-now-button' onClick={ (e) => props.closeModal(e) }>Not Now</div>
                </div>
            </div>
        </div>
    )
}
