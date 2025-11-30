import {model, Schema} from 'mongoose';


const UserRole = {
    ADMIN: 'ADMIN',
    CASHIER: 'CASHIER',
    CUSTOMER: 'CUSTOMER',
}
export const UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false},
        isActive: {type: Boolean, default: false},
        wallet: {type: Number, default: 0},
        role: {type: String, enum: Object.values(UserRole), default: UserRole.CUSTOMER}
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

export const UserModel= model('user', UserSchema);
