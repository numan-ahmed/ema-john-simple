import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
    const {name,quantity,key,price} = props.product;
    const styleReview = {
        borderBottom:'1px solid gray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'

    }
    return (
        <div style={styleReview} className='review-item'>
            <h2 className='product-name'>{name}</h2>
            <p>Quantity: {quantity}</p>
            <p> <small>$ {price}</small></p>
            <br/>
            <button 
                className='main-button'
                onClick={() => props.removeProduct(key)}
            
            >Remove</button>
        </div>
    );
};

export default ReviewItem;