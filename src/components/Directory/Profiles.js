import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { getAllUsers } from '../../apis/Fetch';

import Loading from '../Shared/Loading';

export default function Profiles(props) {
    const [allUsers, setAllUsers] = useState({ users: null });
    const [loadingState, setLoadingState] = useState({ isLoading: null });

    useEffect(() => {
        async function userSearch() { 
            let results = await  getAllUsers();
            
            if (results.length > 0) {
                setAllUsers({users: results})
                setLoadingState({isLoading: false})
            }
         }
        userSearch()
        
        return () => {
        };
    }, [loadingState.isLoading])

    const renderUsers = () => {
        const j = allUsers.users.length;
        const chunk = 10;
        let subset;
        let colArray = []

        for (let i = 0; i < j; i += chunk) {
            subset = allUsers.users.slice(i, i + chunk);
            let usernames = subset.map((i , key) => {
                return (
                    <Link to={`/${i.username}`} key={key+1}>
                        <li className='username'>{i.username}</li>
                    </Link>
                )
            })
            let col = <div className="Directory-col" key={i + 1}> {usernames} </div>
            colArray.push(col)
        }
        return colArray
    }

    const profileLinksParent = () => {
        return (
            <div className='Directory-links-parent'>
                { renderUsers() }
            </div>
        )
    }

    return (
        <React.Fragment>
            <Helmet>
                    <meta charSet="utf-8" />
                    <title>Profiles • Reactagram photos</title>
            </Helmet>
            <div className='Directory-container Profiles' onLoad={ () => setLoadingState({isLoading: true})}>
                <h3 className='Directory-title'>PROFILES DIRECTORY</h3>
                {
                        allUsers.users ? profileLinksParent() : <Loading styleProps={{height: '70vh', width: '100%'}} />
                }
            </div>
        </React.Fragment>
    )
}
