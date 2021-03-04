import React from 'react';

const Card = (props) => {
    const card = props.card;
    console.log(card);
    // const total = card.reduce((total,prd) => total + prd.price,0)
    let total = 0;
    for (let i = 0; i < card.length; i++) {
        const product = card[i];
        total = total + product.price;
    }
    let shipping = 0;
    if(total>35){
        shipping = 0;
    }
    else if (total>15) {
        shipping = 4.99;
        
    }else if(total>0){
        shipping = 12.99;
    }
    const tax = total/10;
    const grandTotal =(total + shipping + Number(tax)).toFixed(2);
const formatNumber = num =>{
    const precision = num.toFixed(2);
    return Number(precision);
}
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {card.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + VAT: {formatNumber(tax)}</small></p>
            <p>Total Price: {grandTotal}</p>
        </div>
    );
};

export default Card;