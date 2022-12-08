import {Router} from "express";
import {dataBase} from "../index";


export const testingRouter = Router({});
testingRouter.delete('/all-data', (req, res) => {
    dataBase.videos = []
   return  res.sendStatus(204)
})