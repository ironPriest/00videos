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
    res.send('Hello: World!')
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
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})

app.put('/videos/:videoId', (req: Request, res: Response) => {
    let video = videos.find(p => p.id === +req.params.videoId)
    if (video) {
        video.title = req.body.title
        res.send(video)
    } else {
        res.send(404)
    }
})

app.delete('/videos/:id',(req: Request, res: Response)=>{
    // put your code here
    videos = videos.filter((v) => v.id !== +req.params.id)
    res.send(204)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})