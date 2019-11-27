import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileView(props) {
    const data = props.userPost.data;
    const height =  Math.abs(props.img.height - props.img.width) < 10  ? '100vw' : props.img.height;
    return (
        <div className='View-post-container-mobile'>
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
            <div
                className='View-post-image'
                style={{
                    backgroundImage: `url(${data.post.image_link})`,
                    height: height
                }}>
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
            <div className='Comment-section'>
                {
                    data.post.caption && <div className='Comment-section-caption'>
                        <div className='View-post-username-parent'>
                            <p className='View-post-caption'>
                                <span className='View-post-caption-username' onClick={ () => props.routeTo(`${data.user.username}`)}>{data.user.username}  {data.user.verified && <span className='Verified'></span>}</span> {data.post.caption}
                            </p>
                        </div>
                    </div>
                }
            </div>
            <div></div>
        </div>
    )
}
