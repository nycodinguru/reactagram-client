import React from 'react';
import { Link } from 'react-router-dom';

export default function ViewPostModal(props) {
    const userData = props.userProfile ? props.userProfile.user.user : props.userPost.user;
    const postData = props.post ? props.post : props.img;
    const toggleFollowModal = props.toggleFollowModal ? props.toggleFollowModal : props.props.toggleFollowModal

    const closeModal = (e) => {
        const validClassArr = ['Close-button', 'View-post-container'];
        function checkClass() { 
            for(let i=0; i < validClassArr.length; i++){
                if (e.target.className.includes(validClassArr[i])) return true
            }
            return false
         }
        
        if (checkClass()){
            props.setModalClass({open: false})
            setTimeout(() => {
                props.setActivePost({ hasPost: false})
                window.history.pushState("", "", props.props.props.history.location.pathname);
                props.controlScroll()
            })
        }
    }


    return (
        <div 
            className={`View-post-container ${props.directViewClass ? props.directViewClass : '' }`} 
            onClick={ props.post ? (e) => closeModal(e) : () => { return null }} >
            {
                props.post && <div className='Close-button' onClick={(e) => closeModal(e)}>×</div>
            } 
            <div 
                className='View-post-modal' 
                style={{ height: props.img.height + 'px' }}>
                <div
                    className='View-post-left-section'
                    style={{
                        backgroundImage: `url(${props.post ? postData.image_link : postData.src})`,
                        width: props.img.width
                    }}>
                </div>
                <div 
                    className='View-post-right-section'
                  >
                    <div className='View-post-user-info'>
                        <div className='View-post-user-profile-image'  style={{backgroundImage: `url(${userData.profile_image_link})`}}></div>
                        <div className='View-post-username-parent'>
                             <p className='View-post-username'>
                                <Link to={`/${userData.username}`}> {userData.username} </Link> 
                                {userData.verified && <span className='Verified'></span>} • 
                                <span onClick={ () => toggleFollowModal('follow')}> Follow</span>
                            </p>
                        </div>
                        <div 
                            className='View-post-menu'
                            onClick={ () => props.toggleMenuModal()} >...
                        </div>
                    </div>
                    <div className='Comment-section'>
                        {
                            postData.caption && <div className='Comment-section-caption'>
                            <div className='View-post-user-profile-image' style={{backgroundImage: `url(${userData.profile_image_link})`}}></div>
                            <div className='View-post-username-parent'> 
                                <Link to={`/${userData.username}`}>
                                    <p className='View-post-caption'><span>{userData.username} {userData.verified && <span className='Verified'></span>}</span> {postData.caption}</p>
                                </Link>
                            </div>
                            </div>
                        }
                    </div>
                    <div className='Stats-section'>
                        <div className='Actions-parent'>
                            <div className='Like Action'></div>
                            <div className='Comment Action'></div>
                            <div className='Share Action'></div>
                        </div>
                        <p className='Likes-stat'>{postData.total_likes} Likes</p>
                        <p className='Post-date'></p>
                    </div>
                    <div className='Comment-input-field-parent'>
                        <div className='Comment-input-field-Login-message'><Link to='/accounts/login'><span>Login in</span></Link> to like or comment.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
