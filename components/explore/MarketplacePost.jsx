import React from 'react';

const MarketplacePost = (props) => {
    return (
        <div className='w-1/2 flex flex-col items-center'>
            <div >
                <img src={props.img} width={175} height={175} alt='Et billede af bogens forside' />
                <h2 className='font-bold'>{props.title}</h2>
                <p>{props.price}</p>
            </div>
        </div>
    );
}

export default MarketplacePost;
