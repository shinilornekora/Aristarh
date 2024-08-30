import { ExportHandler } from "./handlers";

export type Endpoints = '/export' | '/ping';
export type ApiSchema = Record<Endpoints, Handler>;
export interface Handler {
    handler: (req: any, res: any) => void;
    mode: 'post' | 'get';
}

export const endpoints: ApiSchema = {
    '/export': {
        handler: ExportHandler, 
        mode: 'post'
    },
    '/ping': {
        handler: (_, res) => res.send('Service is working.'), 
        mode: 'get'
    },
}