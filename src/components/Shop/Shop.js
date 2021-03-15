import React, { useEffect } from 'react';
import fakeData from "../../fakeData";
import { useState} from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
const Shop = () => {
     const first10 = fakeData.slice(0,10);
     const [products, setProducts] = useState(first10);
    const [card, setCart] = useState([])
  
    useEffect(() =>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(existingKey => {
                const product = fakeData.find(pd => pd.key === existingKey);
                product.quantity = saveCart[existingKey];
                // console.log(existingKey,saveCart[existingKey]);
                return product;
        })
        setCart(previousCart);

    },[])


     const handleAddProduct =(product)=>{
        //  console.log('product add',product);
        const ToBeAddedKey = product.key;
        const sameProduct = card.find(pd => pd.key === ToBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = card.filter(pd => pd.key !== ToBeAddedKey)
            newCart = [...others,sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...card, product]
        }
         setCart(newCart)
         addToDatabaseCart(product.key,count);

     }
   
    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    products.map(pd =>
                         <Product 
                         key={pd.key}
                         showAddToCart={true}
                         handleAddProduct = {handleAddProduct}
                         product={pd}
                         ></Product> )
                }
            </div>
            <div className="card-container">
            <Card card={card}>
                
            <Link to='/review'><button className='main-button'> Review Order</button></Link>
            
            </Card>
            </div>

        </div>
    );
};

export default Shop;