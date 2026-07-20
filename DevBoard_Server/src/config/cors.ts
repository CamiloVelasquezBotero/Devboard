import { CorsOptions } from 'cors'

export const corsConfig:CorsOptions = {
    origin: function(origin, callback) {
        const whiteList = [process.env.FRONTEND_URL]

        if(process.argv[2] == '--api') { /* We verified if the process is in developing */
            whiteList.push(undefined)
        }

        if(whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error from CORS'))
        }
    }
}