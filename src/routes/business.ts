import { Router } from "express";
import { auth } from "../middleware/auth";

const businessRouter = Router();

businessRouter.post('/', auth, (req, res) => {

})

businessRouter.get('/', auth,(req, res) => {

})

businessRouter.get('/slug', (req, res) => {

})

businessRouter.put('/', auth, (req, res) => {

})

businessRouter.delete('/', auth, (req, res) => {

})


export default businessRouter;
