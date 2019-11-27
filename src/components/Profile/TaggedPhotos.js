import React from 'react';

export default function TaggedPhotos(props) {
const noPosts = () => {
    return (
         <div className="No-posts tagged">
                    <p>No Photos Yet</p>
        </div>
    )
}

    return (
            <div className='Posts-section'>
                {
                    noPosts()
                }  
            </div>
    )
}