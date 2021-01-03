import { exec } from 'child_process';
import tcpPortUsed from 'tcp-port-used';

const executeCommand = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                return;
            }

            if (stderr) {
                reject(stderr)
                return;
            }

            resolve(stdout)
        });
    })
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const findOpenPort = async () => {
    const [MIN_PORT, MAX_PORT] = [1024, 65535]
    let port = getRandomInt(MIN_PORT, MAX_PORT)

    let attempts = 0
    let isAvailable = false
    while (attempts < 5 && !isAvailable) {
        console.log(`Checking if port ${port} is open`)

        isAvailable = !(await tcpPortUsed.check(port, '127.0.0.1'))

        if (isAvailable) {
            return
        }

        // retry
        port = getRandomInt(MIN_PORT, MAX_PORT)
        attempts++
    }

    if (!isAvailable) {
        throw Error('No available ports found')
    }

    return port
}

export const addApp = async (name) => {
    await executeCommand(`dokku apps:create ${name}`)
    await executeCommand(`dokku git:initialize ${name}`)
    await executeCommand(`dokku slack:set ${name} ${process.env.SLACK_WEBHOOK_URL}`)

    // const port = await findOpenPort()
    // await executeCommand(`dokku proxy:ports-add ${name} http:${port}:5000`)

    // await executeCommand(`sudo ufw allow ${port}`)
    return
}