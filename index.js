import express, { response } from 'express';
import axios from 'axios';

const port = 3000;
const app = express();

app.use(express.static('public'));

app.get('/', async (req, res) => {

    let secretObj = '';
    try {
        const response = await axios.get('https://secrets-api.appbrewery.com/random');
        secretObj = response.data;
    } catch (error) {
        console.log('Whoops, something went wrong with fetching data from the API.', error);
    }

    res.render('index.ejs', {
        secret: secretObj['secret'],
        user: secretObj['username']
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
