import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// create expresss app
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/', (req: Request, res: Response ) => {

    /*let start = performance.now()
    while(performance.now() - start < 10000) {
        console.log(performance.now() - start)
    }*/

    setInterval(() => {
        res.send('Hello world!')
    }, 10000)

    //res.send('Hello: World!')
})

app.get('/videos', (req: Request, res: Response ) => {
    res.send(videos)
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    let video = videos.find(p => p.id === +req.params.videoId)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})

app.post('/videos', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.status(400).send({
                errorsMessages: [{
                    "message": "cant_be_empty",
                    "field": "title"}],
                resultCode: 1
            })
        return
        } else {
        const newVideo = {
            id: +(new Date()),
            title: req.body.title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)
        res.status(201).send(newVideo)
    }
})

app.put('/videos/:videoId', (req: Request, res: Response) => {
    let video = videos.find(p => p.id === +req.params.videoId)
    let title = req.body.title
    if (video) {
        if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
            res.status(400).send({
                    errorsMessages: [{
                        "message": "cant_be_empty",
                        "field": "title"}],
                    resultCode: 1
                })
            return
        } else {
            video.title = req.body.title
            res.send(204)
        }
    } else {
        res.send(404)
    }
})

app.delete('/videos/:videoId',(req: Request, res: Response)=>{
    let video = videos.find(p => p.id === +req.params.videoId)
    if (video) {
        videos = videos.filter((v) => v.id !== +req.params.videoId)
        res.send(204)
    } else {
        res.send(404)
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})