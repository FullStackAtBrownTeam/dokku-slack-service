import crypto from 'crypto';
import moment from 'moment';

export const slackAuthorize = (req, res, next) => {
    const slackTimestamp = req.header('X-Slack-Request-Timestamp')
    const version = 'v0'
    const bodyText = req.rawBody

    // replay
    if (moment(parseInt(slackTimestamp, 10)).diff(moment(), 'minute') > 5) {
        return res.sendStatus(401)
    }

    const baseString = [version, slackTimestamp, bodyText].join(':')

    const signedRequest = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET).update(baseString).digest('hex');
    const slackSignature = req.header('X-Slack-Signature')

    if (`v0=${signedRequest}` !== slackSignature) {
        return res.sendStatus(401)
    }

    next();
}