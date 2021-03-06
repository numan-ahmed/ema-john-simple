import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Card from '../Card/Card';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useHistory();


    const handleProceedCheckout = () =>{
      history.push('/shipment');
            
    }

    const removeProduct = (productKey) =>{
        // console.log('remove clicked',productKey);

        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }

    useEffect(() => {
        //cart
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        // console.log(cartProducts);
        setCart(cartProducts);

    },[])
        let thankyou;
        if(orderPlaced) {
            thankyou = <img src={happyImage} alt=''/>
        }
    return (
        <div className='twin-container'>
            <div className='product-container'> 
            {
               cart.map(pd => <ReviewItem
               key={pd.key}
               removeProduct = {removeProduct}
               product={pd}></ReviewItem>)
            }
            {
                thankyou
            }
            </div>
            <div className='card-container'>
                <Card card={cart}>
                    <button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
                </Card>
            </div>

        </div>
    );
};

export default Review;