import express from 'express';
import { slackController } from '../controllers'
import { slackAuthorize } from '../utils/slackMiddleware'

const router = express.Router();

router.post('/dokku-add', slackAuthorize, slackController.dokkuAdd);

export default router;