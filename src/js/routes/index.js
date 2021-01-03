import express from 'express';
import slackRouter from './slack'

const router = express.Router();

router.use('/slack', slackRouter);

export default router;