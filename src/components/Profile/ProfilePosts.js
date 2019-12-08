import React, { useState, useEffect } from 'react';
import { isMobileOnly } from "react-device-detect";

import PostModal from './PostModal';
import Loading from '../Shared/Loading';
import MenuModal from '../Shared/MenuModal';

export default function ProfilePosts(props) {
    const [revealStats, setRevealStats] = useState({ postId: '' });
    const [activePost, setActivePost] = useState({
        hasPost: false,
        postId: '',
        image_link: '',
        total_likes: 0,
        total_comments: 0
    })
    const [imageDimentions, setImageDimentions] = useState({
        height: null,
        width: null
    })
    const [loadingState, setLoadingState] = useState({ isLoading: false });
    const [modalClass, setModalClass] = useState({ open: false });
    const [menuModal, setMenuModal] = useState({ open: false });

    const getImageDimentions = (i) => {
        let img = new Image();
        img.src = i;
        setImageDimentions({
            height: img.height,
            width: img.width
        }) 
    }

    const changeRoute = (id) => {
        window.history.pushState("", "", `/${props.props.match.params.user}/${id}`);
    }

    const postsRow = () => {
        const j = props.userPosts.length;
        const chunk = 3;
        let subset;
        let rowArray = []

        for (let i = 0; i < j; i += chunk) {
            subset = props.userPosts.slice(i, i + chunk);
            let posts = subset.map((i, key) => {
                return (
                    <div
                        key={key + 1}
                        className='Post-thumbnail'
                        style={{
                            backgroundImage: `url('${i.image_link}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        onMouseEnter={() => setRevealStats({ postId: i.id })}
                        onMouseLeave={() => setRevealStats({ postId: '' })}
                        onClick={() => presentPost(i)}>
                        {
                            revealStats.postId === i.id ? <div className='Post-thumbnail-stats'>
                                <p className='likes Post-stat'>{i.total_likes}</p>
                                <p className='comments Post-stat'>{i.total_comments}</p>
                            </div> : null
                        }
                    </div>
                )
            })
            let row = <div className="Row" key={i + 1}> {posts} </div>
            rowArray.push(row)
        }
        return rowArray
    }

    useEffect(() => {
        setLoadingState({isLoading: true})
        const checkForPosts = setTimeout(() => { if (props.userPosts.length > 0) setLoadingState({isLoading: false}) }, 1000)
        const clearLoadingFlag = setTimeout(() => { if (loadingState.isLoading) setLoadingState({isLoading: false}) }, 500)
                    return () => {
            clearTimeout(clearLoadingFlag)
            clearTimeout(checkForPosts)
        };
    }, [props.userPosts, props.props.match.params.user])

    const toggleMenuModal = () => {
        let boolVal = menuModal.open ? false : true;
            setMenuModal({open: boolVal})
            setTimeout(() => {
                setModalClass({open: boolVal})
            }, 300)
    }

    const noPosts = () => {
        return (
            <React.Fragment>
                <div className="No-posts">
                    <p>No Posts Yet</p>
                </div>
                {clearTimeout(setLoadingState)}
            </React.Fragment>
        )
    }

    const routeTo = (route) => {
        props.props.history.push(`/${route}`)
    }

    const presentPost = (i) => {
        const data = props.userProfile.user.user;
        getImageDimentions(i.image_link)
        setActivePost({
            hasPost: true,
            id: i.id,
            image_link: i.image_link,
            total_likes: i.total_likes,
            total_comments: i.total_comments,
            caption: i.caption
        })
        controlScroll()
        if (isMobileOnly) routeTo(`${data.username}/${i.id}`)
        else {
            changeRoute(i.id)
        }
    }

    const controlScroll = () => {
        activePost.hasPost ? document.body.style.overflow = "scroll" : document.body.style.overflow = "hidden"
    }

    return (
        <div className='Posts-section'>
            {
                loadingState.isLoading ? <Loading styleProps={{maxHeight: '350px', maxWidth: '938px'}}/> :
                    props.userPosts.length !== 0 && props.userPosts.length > 0 ? postsRow() :
                        noPosts()
            }
            {
                activePost.hasPost && <PostModal
                                        props={props}
                                        img={imageDimentions}
                                        setActivePost={setActivePost}
                                        post={activePost}
                                        userProfile={props.userProfile}
                                        setModalClass={setModalClass}
                                        modalClass={modalClass}
                                        toggleMenuModal={toggleMenuModal}
                                        controlScroll={controlScroll}
                                    />
            }
            <div className="Row" style={{height: 0}}> 
            <div className='Post-thumbnail' style={{height: 0}}></div>
            <div className='Post-thumbnail' style={{height: 0}}></div>
            <div className='Post-thumbnail' style={{height: 0}}></div>
            </div>
            {
                menuModal.open &&
                    <MenuModal
                        props={props}
                        menuModal={menuModal}
                        modalClass={modalClass}
                        toggleMenuModal={toggleMenuModal}
                    />
            }     
        </div>

    )
}