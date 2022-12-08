import {Router} from "express";
import {dataBase} from "../index";


export const testingRouter = Router({});
testingRouter.delete('/', (req, res) => {
    dataBase.videos = []
    res.send(204)
})