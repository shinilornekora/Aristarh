import { formatAPI } from "./utils";

const ApiBase = {
    project: {
        export: '/export',
        import: '/import'
    }
}

export const api = formatAPI(ApiBase);

