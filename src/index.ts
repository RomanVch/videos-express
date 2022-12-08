import express from "express"
import bodyParser from "body-parser"
import {videosRouter} from "./routers/Videos";
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

export const dataBase:DataBaseT = {videos:[
       {
            id: 0,
            title : "start",
            author: "stater",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: "2022-12-07T17:19:31.774Z",
            publicationDate: "2022-12-07T17:19:31.774Z",
            availableResolutions: ["P144"]
        }
    ]
}

const parserMiddleware = bodyParser();

app.use(parserMiddleware).use("/videos", videosRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})