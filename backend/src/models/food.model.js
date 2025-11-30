import {model, Schema} from 'mongoose';

export const FoodSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: Boolean, default: true},
    imageUrl: {type: String, required: true},


},

{
    toJSON: {
        virtuals: true,
    },
    toObject:{
        virtuals:true,
    },
    timestamps: true,
}
);

export const FoodModel = model('food', FoodSchema);     

