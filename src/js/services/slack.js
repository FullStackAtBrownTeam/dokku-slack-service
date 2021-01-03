import axios from 'axios'
import {dokkuService} from './'

export const dokkuAdd = async ({ text, response_url }) => {
    try {
        const [appName] = text.split(' ')
        const port = await dokkuService.addApp(appName)

        const responseMessage = {
            "delete_original": "true",
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `✅ Success! Your app has successfully been added.`,
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `*App Name:*\n${appName}`
                        },
                        // {
                        //     "type": "mrkdwn",
                        //     "text": `*Port:*\n${port}`
                        // },
                        {
                            "type": "mrkdwn",
                            "text": `*URL:*\nhttp://${process.env.DOKKU_INSTANCE_IP_ADDRESS}:${port}`
                        }
                    ]
                }
            ]
        }

        await axios.post(response_url, responseMessage)
    } catch (err) {
        console.error(err)
    }
}