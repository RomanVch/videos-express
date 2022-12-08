import express from "express"
import bodyParser from "body-parser"
import {videosRouter} from "./routers/Videos";
import {testingRouter} from "./routers/Testing";
export const app = express()
const port = 3000

type VideoT = {
    id: number,
    title : string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null|number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}

type DataBaseT = {
    videos:VideoT[]
}

export const dataBase:DataBaseT = {videos:[]
}

const parserMiddleware = bodyParser();

app.use(parserMiddleware).use("/videos", videosRouter).use("/testing",testingRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})