import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createOrder } from '../../services/orderService';
import classes from './checkoutpage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import { uploadImage } from '../../services/uploadService';

export default function CheckoutPage() {
    const { cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = useState({ ...cart });
    const [imageFile, setImageFile] = useState(null); 

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const submit = async data => {
        if (!imageFile) {
            toast.warning('Please upload a picture for identification.');
            return;
        }

        try {
            const customerPictureUrl= await uploadImage(imageFile);
            
            if (!customerPictureUrl){
                return;
            }
            
            await createOrder({ 
                ...order, 
                name: data.name, 
                address: data.address, 
                customerPictureUrl, 
            });

            navigate('/payment');
        } catch (error) {
            toast.error('Image upload or order creation failed.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(submit)} className={classes.container}>
                <div className={classes.content}>
                    <Title title="Order Form" fontSize="1.6rem" />
                    <div className={classes.inputs}>
                        <Input
                            defaultValue={user.name}
                            label="Name"
                            {...register('name')}
                            error={errors.name}
                        />

                    </div>
                    <OrderItemsList order={order} />
                </div>
                <div> 
                    <Title title="Upload Your Picture" fontSize="1.6rem" />
                    <div className={classes.image_input_container}>
                        <label htmlFor="customerPicture" className={classes.image_label}>
                            Customer Picture (Required)
                        </label>
                        <input
                            type="file"
                            id="customerPicture"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className={classes.file_input}
                        />
                        {imageFile && (
                            <img 
                                src={URL.createObjectURL(imageFile)} 
                                alt="Customer Preview" 
                                className={classes.image_preview}
                            />
                        )}
                    </div>
                </div> 

                <div className={classes.buttons_container}>
                    <div className={classes.buttons}>
                        <Button
                            type="submit"
                            text="Go To Payment"
                            width="100%"
                            height="3rem"
                        />
                    </div>
                </div>
            </form>
        </>
    ); 
}