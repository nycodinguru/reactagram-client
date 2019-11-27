import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import ProfilePosts from './ProfilePosts';

import { getUser, getUserPosts } from '../../apis/Fetch';
import NoMatch from '../NoMatch';
import TaggedPhotos from './TaggedPhotos';
import LoginModal from '../LoginModal';
import Loading from '../Shared/Loading';

export default function Profile(props) {
    const [userProfile, setUserProfile] = useState({ user: null });
    const [userPosts, setUserPosts] = useState({ posts: [] });
    const [activeSection, setActiveSection] = useState({
        posts: true,
        feed: false,
        tagged: false
    });
    const [loadingState, setLoadingState] = useState({
        isLoading: false,
        hasLoaded: false
    });
    const [loginModal, setLoginModal] = useState({ 
        open: false,
        trigger: '' 
    });
    const [modalClass, setModalClass] = useState({ open: false });

    function setActive(e){
        if (e.target.getAttribute('category') === 'posts'){
            setActiveSection({
                posts: true,
                feed: false,
                tagged: false
            })
        }
        if (e.target.getAttribute('category') === 'feed'){
            setActiveSection({
                posts: false,
                feed: true,
                tagged: false
            })
        }
        if (e.target.getAttribute('category') === 'tagged'){
            setActiveSection({
                posts: false,
                feed: false,
                tagged: true
            })
        }     
    }

    useEffect(() => {
        async function userSearch() { 
            let results = await  getUser(props.match.params.user);
            setLoadingState({...loadingState, isLoading: true})
           
            if (results.length !== 0 && results.total_posts.count !== 0) {
                setUserProfile({ user: results})
                setLoadingState({isLoading: true, hasLoaded: true})
                let posts = await  getUserPosts(results.user.id);
                setLoadingState({ isLoading: true})

                if (posts) {
                    setUserPosts({ posts: posts})
                } 
            } 
            if (results.length === 0)  { setUserProfile({...userProfile, user: null}) }
         }
        userSearch()
        return () => {
        };
    }, [props.match.params.user])

    const noMatchFound = () => {
        return (
            <NoMatch/>
        )
    }

    const toggleFollowModal = (src) => {
        setLoginModal({open: true, trigger: src})
        setTimeout(() => {
            setModalClass({open: true})
        }, 300)
       
        document.body.style.overflow = "hidden";
    }

    const closeModal = (e) => {
        const cn = e.target.className
       
        if (cn.includes('Login-modal-container') || cn === 'Not-now-button' || cn === 'Close-toggle'){
            setModalClass({open: false})
            setTimeout(() => {
                document.body.style.overflow = "scroll"
                setLoginModal({open: false, trigger: ''})}, 300)
        }
    }

    const profileTemplate = () => {
        const data = userProfile.user.user;
        return (
            <div className='Profile-container'>
                <div className='Profile-header-section'>
                    <div className='Profile-img-parent'>
                        <div className='Profile-img-outer'>
                            <div 
                                className='Profile-img-inner'
                                style={{backgroundImage: `url(${data.profile_image_link})`}}
                            ></div>
                        </div>  
                    </div>
                    <div className='Profile-header-section-right'>
                        <div className='Profile-username-parent'>
                            <p className='Profile-username'>{data.username}
                            {
                                data.verified && <span className='Verified'></span>
                            }
                            </p>
                            <div className='Profile-follow-button Button' onClick={ () => toggleFollowModal('follow')}>Follow</div>
                        </div>
                        <div className='Profile-stats'>
                            <p className='posts stat'><span>{userProfile.user.total_posts.count}</span></p>
                            <p className='followers stat'><span>0</span></p>
                            <p className='following stat'><span>0</span></p>
                        </div>
                        <div className='Profile-header-section-bottom'>
                            <p className='Profile-name'>{data.fname} {data.lname}</p>
                            <p className='Profile-bio'> {data.bio}</p>
                            <a href={data.website} target="_blank" rel="noopener noreferrer">
                                <p className='Profile-website'> {data.website ? data.website.replace(/(^\w+:|^)\/\//, '') : null}</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='Profile-stats'>
                            <p className='posts stat'><span>{userProfile.user.total_posts.count}</span></p>
                            <p className='followers stat'><span>0</span></p>
                            <p className='following stat'><span>0</span></p>
                </div>
                <div className='Profile-posts-container'>
            <div className='Profile-posts-sort-menu'>
                <div className={`posts option ${activeSection.posts ? 'Active' : ''}`} category='posts' onClick={(e) => setActive(e)}></div>
                <div className={`feed option ${activeSection.feed ? 'Active' : ''}`} category='feed' onClick={ () => toggleFollowModal('feed')}></div>
                <div className={`tagged option ${activeSection.tagged ? 'Active' : ''}`} category='tagged' onClick={ () => toggleFollowModal('tagged')}></div>
            </div>
                { activeSection.posts && <ProfilePosts 
                                            props={props}
                                            toggleFollowModal={toggleFollowModal}
                                            userPosts={userPosts.posts}
                                            userProfile={userProfile}
                                        /> }
                { activeSection.tagged && <TaggedPhotos userPosts={userPosts.posts}/> }
            </div>
        </div>
        )
    }
    
    const data = userProfile.user && userProfile.user.user;
    return (
        <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{props.match.params.user} • Reactagram photos</title>
        </Helmet>
        { 
            loadingState.isLoading ? userProfile.user ?
                profileTemplate() : noMatchFound() : <Loading styleProps={{height: '100vh', width: '100vw'}}/> }
        {
            loginModal.open &&
                <LoginModal
                    props={props}
                    imgurl={data.profile_image_link}
                    loginModal={loginModal}
                    setLoginModal={setLoginModal}
                    closeModal={closeModal}
                    modalClass={modalClass}
                    />
        }   
        </React.Fragment>
    )
    
}


 {/* <div className='Profile-memories-section'>
                <div className='Profile-memory'>
                    <div className='Profile-memory-img-outer'>
                        <div className='Profile-memory-img-inner'></div>   
                    </div>
                    <p className='Profile-memory-title'>Code ...</p>
                </div>
                <div className='Profile-memory'>
                    <div className='Profile-memory-img-outer'>
                        <div className='Profile-memory-img-inner'></div>   
                    </div>
                    <p className='Profile-memory-title'>Tuesday</p>
                </div>
                <div className='Profile-memory'>
                    <div className='Profile-memory-img-outer'>
                        <div className='Profile-memory-img-inner'></div>   
                    </div>
                    <p className='Profile-memory-title'>Mar 2019</p>
                </div>
                <div className='Profile-memory'>
                    <div className='Profile-memory-img-outer'>
                        <div className='Profile-memory-img-inner'></div>   
                    </div>
                    <p className='Profile-memory-title'>Memory</p>
                </div>
                <div className='Profile-memory'>
                    <div className='Profile-memory-img-outer'>
                        <div className='Profile-memory-img-inner'></div>   
                    </div>
                    <p className='Profile-memory-title'>Tuesday</p>
                </div>
                <div className='Profile-memory'>
                    <div className='Profile-memory-img-outer'>
                        <div className='Profile-memory-img-inner'></div>   
                    </div>
                    <p className='Profile-memory-title'>Mar 2019</p>
                </div>
            </div> */}