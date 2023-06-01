import { feedTheDragons } from './magic.js';
import { start as startBot } from './bot/index.js';
import express from 'express'

const app = express()

feedTheDragons();

// eslint-disable-next-line @typescript-eslint/no-floating-promises
startBot();


app.get('/', (_, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`app is listening on port ${process.env.PORT || 5000}!`)
});