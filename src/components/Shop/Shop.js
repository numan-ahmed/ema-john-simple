import React from 'react';
import fakeData from "../../fakeData";
import { useState} from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Card from '../Card/Card';
const Shop = () => {
     const first10 = fakeData.slice(0,10);
     const [products, setProducts] = useState(first10);
    const [card, setCart] = useState([])
  
     const handleAddProduct =(product)=>{
        //  console.log('product add',product);
         const newCart =[...card,product];
         setCart(newCart);

     }
   
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(pd =>
                         <Product 
                         handleAddProduct = {handleAddProduct}
                         product={pd}
                         ></Product> )
                }
            </div>
            <div className="card-container">
            <Card card={card}></Card>
            </div>

        </div>
    );
};

export default Shop;