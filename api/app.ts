import HyperExpress from 'hyper-express'
import { selectBanks } from './db/banks';
import corsHandler from './middlewares/corsHandler';
const webserver = new HyperExpress.Server();

webserver.use(corsHandler({ origin: process.env.CORS_ORIGIN, credentials: true, optionsRoute: true }));
// Create GET route to serve 'Hello World'
webserver.get('/projects/:id/banks', async (request, response) => {
    const banks = await selectBanks();
    response.json(banks);
})

webserver.listen(3000)
    .then(() => console.log('Webserver started on port 80'))
    .catch((error: never) => {
        console.log('Failed to start webserver on port 80')
        console.error(error)
        process.exit(1)
    });
