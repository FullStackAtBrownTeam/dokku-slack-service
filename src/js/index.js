import _ from './env'

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import rootRouter from './routes'

const PORT = process.env.PORT || 8080

export const app = express();

const rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));

app.use(cors());

app.use('/dokku-slack-service', rootRouter);

app.listen(PORT, '0.0.0.0', () => console.log(`Server listenting at ${PORT}`));