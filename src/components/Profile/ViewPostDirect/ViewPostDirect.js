import React, { useEffect, useReducer } from 'react';
import { Helmet } from "react-helmet";
import { isMobileOnly } from "react-device-detect";

import { getSinglePost } from '../../../apis/Fetch';

import Loading from '../../Shared/Loading';
import NoMatch from '../../NoMatch';
import LoginModal from '../../LoginModal';
import MenuModal from '../../Shared/MenuModal';
import PostModal from '../PostModal';
import MobileView from './MobileView';

const reducer = (state, action) => {
    switch (action.type) {
        case 'loading': 
            return { 
                ...state, 
                loading: action.value
            };
        case 'post_payload':
            return {
                ...state,
                  userPost: action.post
                };
        case 'profile_payload':
            return {
                ...state,
                userProfile: action.profile
                };
        case 'modal_class':
            return { 
                ...state, 
                modalClass: action.value
            };
        case 'login_modal':
            return { 
                ...state,
                loginModal: {
                    open: action.value,
                    trigger: action.trigger
                }
            };
        case 'menu_modal':
            return {
                ...state,
                menuModal: action.value
            };
        default:
            break;
    }
    return state;
};

const initialState = {
    userProfile: {},
    userPost: [],
    loading: true,
    modalClass: false,
    loginModal: {
        open: false,
        trigger: ''  },
    menuModal: false
};

export default function ViewPost(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { userProfile, userPost, loading, modalClass, loginModal, menuModal } = state;

    const toggleMenuModal = () => {
        let boolVal = state.menuModal ? false : true;
        dispatch({ type: 'menu_modal', value: boolVal })
        setTimeout(() => {
            dispatch({ type: 'modal_class', value: boolVal })
        }, 300)
    }

    const toggleFollowModal = (src) => {
        //setLoginModal({open: true, trigger: src})
        setTimeout(() => {
            //setModalClass({open: true})
        }, 300)
            }

    const closeModal = (e) => {
        const validClassArr = ['Menu-modal-container', 'Cancel', 'Not-now-button', 'Close-toggle', 'Login-modal-container'];
        
        function checkClass(cn) { return cn === e.target.className }

        if (e.target.className.includes(validClassArr.filter(checkClass))){
            dispatch({ type: 'modal_class', modalClass: false })
            setTimeout(() => {
                dispatch({ type: 'menu_modal', menuModal: false })
                //setLoginModal({open: false, trigger: ''})
            }, 300)   
        }
    }

    const getImageDimentions = (info) => {
        let img = new Image();
        img.src = info.image_link;
        img.caption = info.caption;

        if (img.src){
            if ( isMobileOnly ) return viewMobile(img);
            else return viewPostModal(img);
        } 
    }

    useEffect(() => {
        async function userSearch() {
            let post = await getSinglePost(props.match.params.user, props.match.params.postId);
            if (post) { 
                     dispatch({ type: 'post_payload', post: post }) 
                     dispatch({ type: 'loading', loading: false }) 
                }
            if (post === null) { dispatch({ type: 'post_payload', post: null }) }
        }
        userSearch()
        return () => {
        };
    }, [props.match.params.user, props.match.params.postId])

    const routeTo = (route) => {
        props.history.push(`/${route}`)
    }

    const viewMobile = (img) => {
        window.scrollTo(0, 0)
        return (
            <MobileView 
                img={img}
                userPost={state.userPost}
                toggleFollowModal={toggleFollowModal}
                toggleMenuModal={toggleMenuModal}
                routeTo={routeTo}
            />
        )
    }

    const viewPostModal = (img) => {
        window.scrollTo(0, 0)
        return (
            <PostModal 
                img={img}
                userPost={state.userPost}
                toggleFollowModal={toggleFollowModal}
                toggleMenuModal={toggleMenuModal}
                routeTo={routeTo}
                directViewClass={'Direct-view'}
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
                state.loading ?
                    <Loading styleProps={{ height: 'calc(100vh - 97px)', width: '100vw', padding: '130px 0 0 0' }} /> : state.userPost.user && state.userPost.post ?
                        getImageDimentions(state.userPost.post) : <NoMatch />
            }
            {/* {
                state.loginModal.open &&
                    <LoginModal
                        props={props}
                        imgurl={userPost.data.user.profile_image_link}
                        loginModal={loginModal}
                        setLoginModal={setLoginModal}
                        closeModal={closeModal}
                        modalClass={modalClass}
                    />
            }  */}
            {
                state.menuModal &&
                    <MenuModal
                        props={props}
                        menuModal={state.menuModal}
                        modalClass={state.modalClass}
                        toggleMenuModal={toggleMenuModal}
                    />
            }     
        </React.Fragment>

    )
}

