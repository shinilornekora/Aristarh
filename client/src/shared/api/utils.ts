import { Api, ApiBaseHandler, ApiBaseType, ApiEntity } from "./types";

const SERVER_API_ROUTE = `${removePort(window.location.origin)}:3005/api`;

export function removePort(str: string) {
    const colonIndex = str.lastIndexOf(':');

    if (colonIndex === -1) {
        return str;
    } 
    
    return str.substring(0, colonIndex);
}

export function formatAPI(apis: ApiBaseType): Api {
    const apiEntities = Object.keys(apis) as (ApiEntity)[];
    const apiSchema = {} as Api

    for (const entity of apiEntities) {
        const handlers = Object.entries(apis[entity]) as [ApiBaseHandler, string][];


        handlers.forEach(([key, path]) => {
            if (!apiSchema[entity]) {
                apiSchema[entity] = {} as Api[ApiEntity];
            }

            // TODO: индексация хочет быть через И, я же хочу чтобы она была через ИЛИ.
            // @ts-expect-error: сложные типы
            apiSchema[entity][key] = prepareForApiCall(`${SERVER_API_ROUTE}${path}/`) as Partial<ApiHandlerReturnType>
        })
    }

    return apiSchema;
}

export function prepareForApiCall(callPath: string) {
    return async (params: Record<string, unknown>) => {
        const callParams = {
            method: 'post',
            body: JSON.stringify({ ...params }),
            headers: new Headers({'content-type': 'application/json'})
        }

        const response = (await fetch(callPath, callParams)).json();

        Aristarh.voice(`Получен ответ с ручки ${callPath}`, response);

        return response;
    }
}