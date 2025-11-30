import { Router } from "express"; 
import { FoodModel } from "../models/food.model.js";
import handler from "express-async-handler";

const router = Router();

router.get('/', handler(async(req, res) => {
    const foods = await FoodModel.find({});
    res.send(foods);
})
);

router.get('/:foodId', handler(async (req, res) => {
    const {foodId} = req.params;
    const food = await FoodModel.findById(foodId);
    res.send(food);
})
);

export default router; 