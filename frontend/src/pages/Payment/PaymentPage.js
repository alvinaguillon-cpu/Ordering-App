import React, {useState, useEffect} from 'react';
import classes from './paymentPage.module.css';
import { getNewOrderForCurrentUser } from '../../services/orderService';
import Title from '../../components/Title/Title';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import PaypalButtons from '../../components/PaypalButtons/PaypalButtons';

export default function PaymentPage() {

    const [order, setOrder] = useState();

    useEffect(() => {
        getNewOrderForCurrentUser().then(data => setOrder(data));
    }, []);

    if (!order) return;


  return (
    <>
        <div className={classes.container}>
            <div className={classes.content}>
                <Title title="Order Form" fontSize="1.6rem"/>
                <div>
                    <h3>
                        Name:
                    </h3>
                    <span>{order.name}</span>
                </div>
                {order.customerPictureUrl && (
                        <div className={classes.customerPicture}>
                            <Title title="Customer Picture for Pickup" fontSize="1.4rem"/>
                            <img 
                                src={order.customerPictureUrl} 
                                alt={`${order.name}`}
                                className={classes.customer_img} 
                            />
                        </div>
                    )}
            </div>
            <OrderItemsList order={order} />
        </div>

        <div className={classes.buttons_container}>
            <div className={classes.buttons}>
                Pay 
            </div>

        </div>
    </>
  )
}
