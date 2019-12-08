import React, { useEffect, useState, useCallback } from 'react';
import ReactagramSVG from '../svgs/Reactagram';
import SearchResults from './SearchResults';
import { searchUsers } from '../../apis/Fetch';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    const _searchField = React.createRef();
    const [searchResult, setSearchResult] = useState({ results: [] });
    const [renderNav, setRenderNav] = useState({ render: false })
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState(false);
    const [scroll, setScroll] = useState(1)

    function activateSearchField() {
        setSearch({ searchActive: true })
    }

    function clearSearchField() {
        _searchField.current.value = ''
        setSearchResult({ results: [] })
        removeFocus()
    }

    function removeFocus() {
        document.activeElement.blur()
        setTimeout(() => setSearch({ ...search, searchActive: false }), 150)
    }

    async function userSearch(e) {
        if (e.target.value.length === 0) {
            setSearch({ searchActive: false })
            setLoading({ loadingResults: false })
        }
        else setSearch({ searchActive: true })

        setLoading({ loadingResults: true })
        let results = await searchUsers(e.target.value)
        if (results) {
            setSearchResult({ ...searchResult, results: results })
            setLoading({ loadingResults: false })
        }
    }

    const onScroll = useCallback(() => {
        const scrollCheck = window.scrollY < 70
        if (scrollCheck !== scroll) {
            setScroll(scrollCheck)
        }
    }, [scroll]);

    useEffect(() => {
        const navValidation = setTimeout(() => {
            if (document.title.includes('Page Not Found')) { return null }
            else {
                setRenderNav({ render: true })
                document.addEventListener("scroll", onScroll)
            }
        }, 300)
        return () => {
            document.addEventListener("scroll", onScroll)
            clearTimeout(navValidation)
        };
    }, [onScroll, setScroll, renderNav])

    const navbar = () => {
        return (
            <div className='Navbar-container'>
                <div className={`Navbar-inner ${scroll ? '' : 'Scrolled'} `} >
                    <Link to='/'>
                        <div className='Logo-div'>
                            <div className='Logo' ></div>
                            <div className='Vr' ></div>
                            <ReactagramSVG />
                        </div>
                    </Link>
                    <input
                        ref={_searchField}
                        className='Search-field'
                        type='text'
                        placeholder='Search'
                        onChange={(e) => userSearch(e)}
                        onBlur={() => removeFocus()}
                        onFocus={() => activateSearchField()}
                    >
                    </input>
                    <div className='Glyph-div'></div>
                    <div className={`Search-field-clear ${search.searchActive ? 'active' : ''} ${loading.loadingResults ? 'loading' : ''}`} onClick={() => clearSearchField()}></div>
                    <div className='Buttons-div'>
                        <div className='Login-button Button'><Link to="/accounts/login">Log In</Link></div>
                        <div className='Vr'></div>
                        <div className='Signup-button Button'><Link to="/accounts/signup"> Sign Up</Link></div>
                    </div>
                </div>
                {
                    searchResult.results.length > 0 &&
                    <SearchResults
                        searchResult={searchResult}
                        props={props}
                        className={`${search.searchActive ? 'active' : ''}`}
                    />
                }
            </div>
        )
    }

    return (
        renderNav.render && navbar()
    )
}
