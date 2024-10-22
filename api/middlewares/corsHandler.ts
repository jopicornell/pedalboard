import HyperExpress from 'hyper-express'

interface CORSOptions {
    origin?: string
    credentials: boolean
    optionsRoute?: boolean
}

const corsHandler = (options: CORSOptions) => {
    return async (request: HyperExpress.Request, response: HyperExpress.Response) => {
        if (request.method === 'OPTIONS') {
            response.header('vary', 'Origin')
            response.header('Access-Control-Allow-Headers', 'content-type')
            response.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET')
            response.header('Access-Control-Allow-Origin', options.origin ?? '*')
            response.header('Access-Control-Allow-Credentials', options.credentials.toString())
            response.status(200)
            response.send('')
        } else {
            response.header('Access-Control-Allow-Origin', options.origin ?? '*')
            response.header('Access-Control-Allow-Credentials', options.credentials.toString())

        }
    }
}


export default corsHandler
