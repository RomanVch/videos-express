import {Router} from "express";
import {dataBase} from "../index";

export const videosRouter = Router({});
const startDate = 1546300800000

videosRouter.get('/', (req, res) => {
    if( dataBase.videos.length ){
        res.status(200).send(dataBase.videos)
    }
})

videosRouter.post('/',(req, res)=>{
    const video = {
        id:  dataBase.videos.length,
        title : '',
        author: '',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: []
    }
    if ( typeof req.body.title === "string" && req.body.title.length < 40) {
        video.title = req.body.title
    } else {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "If the inputModel has incorrect values",
                    field: "title"
                }
            ]
        })
        return;
    }
    if(typeof req.body.author === "string" && req.body.author.length < 20){
        video.author = req.body.author
    } else {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "If the inputModel has incorrect values",
                    field: "author"
                }
            ]
        })
        return;
    }
    const checkString = req.body.availableResolutions.filter((item:string|any)=> typeof item === "string")
    if(Array.isArray(req.body.availableResolutions) && req.body.availableResolutions.length > 0 && checkString.length === req.body.availableResolutions.length){
        video.availableResolutions = req.body.availableResolutions
    } else {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "If the inputModel has incorrect values",
                    field: "availableResolutions"
                }
            ]
        })
    return;
    }
    dataBase.videos.push(video)
    res.status(201).send(video)
})

videosRouter.get('/:id', (req, res) => {
   const video =  dataBase.videos.find((item)=>item.id === +req.params.id)
    if( video ){
        res.send(video)
    } else {
        res.send(404)
    }
})

videosRouter.put('/:id', (req, res) => {
    const id = +req.params.id;
    const video = dataBase.videos.find((item)=>item.id === id);
    if(video){
            if ( typeof req.body.title === "string" && req.body.title.length < 40){
                video.title = req.body.title;
            } else {
                res.status(400).send({
                    errorsMessages: [
                        {
                            message: "If the inputModel has incorrect values",
                            field: "title"
                        }
                    ]
                })
                return;
            } if ( typeof req.body.author === "string" && req.body.author.length < 20) {
                video.author = req.body.author;
            } else {
            res.status(400).send({
                errorsMessages: [
                    {
                        message: "If the inputModel has incorrect values",
                        field: "author"
                    }
                ]
            })
            return;
        }
            const checkString = req.body.availableResolutions.filter((item:string|any)=> typeof item === "string")
            if ( Array.isArray(req.body.availableResolutions) && req.body.availableResolutions.length > 0 && checkString.length === req.body.availableResolutions.length ){
                video.availableResolutions = req.body.availableResolutions
            } else {
            res.status(400).send({
                errorsMessages: [
                    {
                        message: "If the inputModel has incorrect values",
                        field: "availableResolutions"
                    }
                ]
            })
            return;
        } if (typeof req.body.canBeDownloaded === "boolean") {
                video.canBeDownloaded = req.body.canBeDownloaded;
            } else {
            res.status(400).send({
                errorsMessages: [
                    {
                        message: "If the inputModel has incorrect values",
                        field: "canBeDownloaded"
                    }
                ]
            })
            return;
        } if (typeof req.body.minAgeRestriction === "number" && req.body.minAgeRestriction < 19 && req.body.minAgeRestriction > 0){
                video.minAgeRestriction = req.body.minAgeRestriction
            } else {
            res.status(400).send({
                errorsMessages: [
                    {
                        message: "If the inputModel has incorrect values",
                        field: "minAgeRestriction"
                    }
                ]
            })
            return;
        } if ( Date.parse(req.body.publicationDate) > startDate) {
                video.publicationDate = new Date(req.body.publicationDate).toISOString()
            }  else {
            res.status(400).send({
                errorsMessages: [
                    {
                        message: "If the inputModel has incorrect values",
                        field: "publicationDate"
                    }
                ]
            })
            return;
        }
        console.log()
            dataBase.videos = dataBase.videos.filter((item)=>item.id !== id)
            dataBase.videos.push(video);
            res.sendStatus(204)
    } else {
        res.sendStatus(404) //return
    }
})


videosRouter.delete('/:id', (req, res) => {
    const id = +req.params.id
    const checkVideo = dataBase.videos.find((item)=>item.id === id)
    if(checkVideo){
        dataBase.videos = dataBase.videos.filter((item)=> item.id !== id)
        return  res.sendStatus(204);
        }else {
         return  res.sendStatus(404)
        }

})

