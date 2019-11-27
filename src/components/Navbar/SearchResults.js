import React from 'react';

export default function SearchResults(props) {

    const routeTo = (route) => {
        props.props.props.history.push(`/${route}`)
    }

    const results = props.searchResult.results.map( (i , key) => {
        return (
            <li className='Search-results-list-item' key={key+1} onClick={ () => routeTo(i.username)}>
                        <div className='Search-results-item'>
                            <div className='Search-result-left'
                                style={{backgroundImage: `url('${i.profile_image_link}')`}}
                            ></div>
                            <div className='Search-result-right'>
                                <p className='Search-result-username'>{i.username} {i.verified && <span className='Verified'></span>}</p>
                                <p className='Search-result-name'>{i.fname} {i.lname}</p>
                            </div>
                        </div>
            </li>
        )
    })

    return (
        <div className='Search-results-outer-container'>
            <div className={`triangle ${props.className}`}></div>
            <div className={`Search-results-container ${props.className}`}>
                <div className='Search-results-inner-container'>
                    <ul className='Search-results-list'>
                        {results}
                    </ul>
                </div>
            </div>  
        </div>
        
    )
}
