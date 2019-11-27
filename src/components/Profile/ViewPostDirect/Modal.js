import React from 'react';
import { Link } from 'react-router-dom';

export default function Modal(props) {
    const data = props.userPost.data;
    return (
        
            <div className='View-post-container Direct-view'>
                <div
                    className='View-post-modal'
                    style={{ height: props.img.height + 'px' }}>
                    <div
                        className='View-post-left-section'
                        style={{
                            backgroundImage: `url(${data.post.image_link})`,
                            width: props.img.width
                        }}>
                    </div>
                    <div className='View-post-right-section'>
                        <div className='View-post-user-info'>
                            <div className='View-post-user-profile-image' style={{ backgroundImage: `url(${data.user.profile_image_link})` }}></div>
                            <div className='View-post-username-parent'>
                                <p className='View-post-username'>
                                    <Link to={`/${data.user.username}`}> {data.user.username} </Link> 
                                    {data.user.verified && <span className='Verified'></span>} • 
                                    <span onClick={ () => props.toggleFollowModal('follow')}> Follow</span>
                                </p>
                            </div>
                            <div 
                                className='View-post-menu'
                                onClick={ () => props.toggleMenuModal()} >...
                            </div>
                        </div>
                        <div className='Comment-section'>
                            {
                                data.post.caption && <div className='Comment-section-caption'>
                                    <div className='View-post-user-profile-image' style={{ backgroundImage: `url(${data.user.profile_image_link})` }}></div>
                                    <div className='View-post-username-parent'>
                                        <Link to={`/${data.user.username}`}>
                                            <p className='View-post-caption'><span>{data.user.username}  {data.user.verified && <span className='Verified'></span>}</span> {data.post.caption}</p>
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
                            <p className='Likes-stat'>{data.post.total_likes} Likes</p>
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
