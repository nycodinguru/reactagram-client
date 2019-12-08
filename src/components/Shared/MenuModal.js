import React from 'react';

export default function MenuModal(props) {
    return (
        <div 
            className={`Menu-modal-container ${ props.modalClass ? 'Open' : ''}`}
            onClick={ (e) => props.toggleMenuModal(e)} >
            <div className='Menu-modal'>
                <ul className='Menu-modal-list'>
                    <li className='Menu-modal-list-item'>Report inappropriate</li>
                    <li className='Menu-modal-list-item'>Embed</li>
                    <li className='Menu-modal-list-item'>Share</li>
                    <li className='Menu-modal-list-item'>Copy Link</li>
                    <li 
                        className='Menu-modal-list-item Cancel'  
                        onClick={ (e) => props.toggleMenuModal(e)}> Cancel
                    </li>
                </ul>
            </div>
        </div>
    )
}
