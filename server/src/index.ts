import { PORT } from './constants';
import { ApiSchema, Endpoints, endpoints } from './schema';

const app = require('express')();
const cors = require('cors')();
const bodyParser = require('body-parser');
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

app.use(cors)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressCspHeader({ 
    policies: { 
        'default-src': [expressCspHeader.NONE], 
        'img-src': [expressCspHeader.SELF], 
    } 
}));

app.use((_: any, res: any, next: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const handlers = Object.keys(endpoints) as (keyof ApiSchema)[];

interface Profiler {
    mode: 'post' | 'get' | 'options';
    handler: Endpoints;
    handler_call: (req: any, res: any) => void
}

const profiler = ({ mode, handler, handler_call }: Profiler) => {
    console.log('READY: ', mode, `/api${handler}`);

    function safeCallDecorator(req: any, res: any) {
        let parseInfo = 'BASIC_ANSWER';

        try {
            parseInfo = JSON.stringify(req.body)
        } catch (error) {
            console.log('An error occured during parsing request body')
        }

        console.log(`Call registered [${mode}]: /api${handler}`, parseInfo);
        handler_call(req, res);
    }

    app[mode](`/api${handler}`, safeCallDecorator)
}

for (const handler of handlers) {
    const { mode, handler: handler_call } = endpoints[handler]

    profiler({ mode, handler, handler_call });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});