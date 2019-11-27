import React from 'react';
import { Link } from 'react-router-dom';

export default function ViewPostModal(props) {
    const userData = props.userProfile.user.user;
    const postData = props.post;

    const closeModal = (e) => {
        const cn = e.target.className
        if (cn.includes('Close-button') || cn.includes('View-post-container')){
            document.body.style.overflow = "scroll"
            props.setActivePost({ hasPost: false})
            window.history.pushState("", "", props.props.props.history.location.pathname);
        } 
    }

    return (
        <div className='View-post-container' onClick={(e) => closeModal(e)}>
            <div className='Close-button' onClick={(e) => closeModal(e)}>×</div>
            <div 
                className='View-post-modal' 
                style={  window.innerWidth > 945 ? {height: props.imageDimentions.height+'px' } : {height: '59vw', width: '89vw' }}>
                <div 
                    className='View-post-left-section'
                    style={ window.innerWidth > 945 ? {
                        backgroundImage: `url(${postData.imageLink})`,
                        width: props.imageDimentions.width
                        } : {
                        backgroundImage: `url(${postData.imageLink})`,
                        width: '52vw'
                        }}
                    >
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
                                <span onClick={ () => props.props.toggleFollowModal('follow')}> Follow</span>
                            </p>
                        </div>
                        <div className='View-post-menu'>...</div>
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
                        <p className='Likes-stat'>{postData.totalLikes} Likes</p>
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
