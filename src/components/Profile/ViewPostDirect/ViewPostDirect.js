import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { isMobileOnly } from "react-device-detect";

import { getSinglePost } from '../../../apis/Fetch';

import Loading from '../../Shared/Loading';
import NoMatch from '../../NoMatch';
import LoginModal from '../../LoginModal';
import MenuModal from '../../Shared/MenuModal';
import Modal from './Modal';
import MobileView from './MobileView';

export default function ViewPost(props) {
    const [userProfile, setUserProfile] = useState({ user: {} });
    const [userPost, setUserPost] = useState({ data: [] });
    const [loadingState, setLoadingState] = useState({ isLoading: true });
    const [modalClass, setModalClass] = useState({ open: false });
    const [loginModal, setLoginModal] = useState({ 
        open: false,
        trigger: ''  });
    const [menuModal, setMenuModal] = useState({ open: false });

    const toggleMenuModal = () => {
        setMenuModal({open: true})
        setTimeout(() => {
            setModalClass({open: true})
        }, 300)
        document.body.style.overflow = "hidden";
    }

    const toggleFollowModal = (src) => {
        setLoginModal({open: true, trigger: src})
        setTimeout(() => {
            setModalClass({open: true})
        }, 300)
        document.body.style.overflow = "hidden";
    }

    const closeModal = (e) => {
        const validClassArr = ['Menu-modal-container', 'Cancel', 'Not-now-button', 'Close-toggle', 'Login-modal-container'];
        
        function checkClass(cn) {
            return cn === e.target.className;
        }

        if (e.target.className.includes(validClassArr.filter(checkClass))){
            setModalClass({open: false})
            setTimeout(() => {
                document.body.style.overflow = "scroll"
                setMenuModal({open: false})
                setLoginModal({open: false, trigger: ''})}, 300)
        }
    }

    const getImageDimentions = (info) => {
        let img = new Image();
        img.src = info.post.image_link;

        if (img.src){
            if ( isMobileOnly ) return viewMobile(img);
            else return viewPostModal(img);
        } 
    }

    useEffect(() => {
        async function userSearch() {
            let post = await getSinglePost(props.match.params.user, props.match.params.postId);
            if (post) {
                setUserPost({ data: post })
            }
            if (post === null) { setUserProfile({ ...userProfile, user: null }) }
            const checkForPosts = setTimeout(() => { if (post) setLoadingState({ isLoading: false }) }, 1500)
        }
        userSearch()
        return () => {
        };
    }, [props.match.params.user, props.match.params.postId])

    const routeTo = (route) => {
        props.history.push(`/${route}`)
    }

    const viewMobile = (img) => {

        return (
            <MobileView 
                img={img}
                userPost={userPost}
                toggleFollowModal={toggleFollowModal}
                toggleMenuModal={toggleMenuModal}
                routeTo={routeTo}
            />
        )
    }

    const viewPostModal = (img) => {
        return (
            <Modal 
                img={img}
                userPost={userPost}
                toggleFollowModal={toggleFollowModal}
                toggleMenuModal={toggleMenuModal}
                routeTo={routeTo}
            />
        )
    }

    return (
        
        <React.Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{props.match.params.user} • Reactagram photos</title>
            </Helmet>
            {
                loadingState.isLoading ?
                    <Loading styleProps={{ height: 'calc(100vh - 97px)', width: '100vw', padding: '130px 0 0 0' }} /> : userPost.data.post ?
                        getImageDimentions(userPost.data) : <NoMatch />
            }
            {
                loginModal.open &&
                    <LoginModal
                        props={props}
                        imgurl={userPost.data.user.profile_image_link}
                        loginModal={loginModal}
                        setLoginModal={setLoginModal}
                        closeModal={closeModal}
                        modalClass={modalClass}
                    />
            } 
            {
                menuModal.open &&
                    <MenuModal
                        props={props}
                        menuModal={menuModal}
                        setMenuModal={setMenuModal}
                        closeModal={closeModal}
                        modalClass={modalClass}
                    />
            }     
        </React.Fragment>

    )
}

