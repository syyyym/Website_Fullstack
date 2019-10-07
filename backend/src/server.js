import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
const config = require('./config');

const app = express();
app.use(bodyParser.json());

app.get('/api/articles/:name', async (req, res) => {
    try {
        const articleName = req.params.name;
        const client = await MongoClient.connect(config.dbURI, { useNewUrlParser: true });
        const db = client.db('my-website');
    
        const articleInfo = await db.collection('articles').findOne({ name: articleName })
        res.status(200).json(articleInfo);
    
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
    
})

app.post('/api/articles/:name/upvote', async (req, res) => {
    try {
        const articleName = req.params.name;
        const client = await MongoClient.connect(config.dbURI, { useNewUrlParser: true });
        const db = client.db('my-website');
    
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                upvotes: articleInfo.upvotes + 1,
            },
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
    
        res.status(200).json(updatedArticleInfo);
    
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
});

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, text } = req.body; 
    const articleName = req.params.name;

    articlesInfo[articleName].comments.push({ username, text });
    res.status(200).send(articlesInfo[articleName]);
}); 

app.listen(8000, () => console.log('Listening on port 8000'));