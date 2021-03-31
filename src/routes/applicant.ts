import { Router } from "express";
import { auth } from "../middleware/auth";

const applicantRouter = Router();

applicantRouter.post('/', auth, (req, res) => {

})

applicantRouter.get('/', auth,(req, res) => {

})

applicantRouter.get('/slug', (req, res) => {

})

applicantRouter.put('/', auth, (req, res) => {

})

applicantRouter.delete('/', auth, (req, res) => {

})


export default applicantRouter;
