import { ExportHandler } from "./handlers";
import { ImportHandler } from "./handlers/import";

export type Endpoints = '/export' | '/ping' | '/import';
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
    '/import': {
        handler: ImportHandler,
        mode: 'post'
    },
    '/ping': {
        handler: (_, res) => res.send('Service is working.'), 
        mode: 'get'
    },
}