import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './foodPage.module.css';
import { getById } from '../../services/foodService';
import Price from '../../components/Price/Price';
import {useCart} from '../../hooks/useCart';
import NotFound from '../../components/NotFound/notFound';

export default function FoodPage() {
    const [food, setFood] = useState({});
    const {id} = useParams();
    const {addToCart} = useCart();
    const navigate = useNavigate();


    const handleAddToCart = () => {  
        addToCart(food);
        navigate('/cart');
    }
    useEffect(() => {
        getById(id).then(setFood);
    }, [id]);    
    return <>  
        {!food? ( <NotFound message = "Food Not Found!" linkText= "Back to Homepage"/> ): (
        <div className={classes.container}>
            <img className={classes.image}
            src={`${food.imageUrl}`}
            alt={food.name} />
            
            <div className={classes.details}>
                <div className={classes.header}>
                    <span className={classes.name}>{food.name}</span>
                </div> 
                <div className={classes.price}>
                    <Price price={food.price} />
                </div>

                <button onClick={handleAddToCart}>Add to Cart</button> 
            </div>
        </div>
        )
        }   
    </>   
}
