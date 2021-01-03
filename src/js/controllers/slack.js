import { slackService } from '../services'

export const dokkuAdd = (req, res, next) => {
    try {
        const message = req.body;
        res.status(200).json({
            "text": "Thanks for your request, we'll process it and get back to you.",
            "response_type": "ephemeral"
        });

        slackService.dokkuAdd(message)
    } catch (err) {
        console.error(err)
    }
}