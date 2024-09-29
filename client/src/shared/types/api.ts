export type BaseRequest<P, R> = (params: P) => Promise<R>;

export type ProjectSettings = {
    name: string;
    tree: Node[];
};

export interface ProjectApi {
    export: BaseRequest<Record<string, unknown>, { project: ProjectSettings }>;
    import: BaseRequest<ProjectSettings, Record<string, { isValid: boolean, reason?: string }>>;
}

export interface Api {
    project: ProjectApi,
}

export type ApiEntity = keyof Api;

export type ApiHandler = keyof Api[ApiEntity];

export type ApiHandlerReturnType = Api[ApiEntity][ApiHandler]

export interface ProjectApiBase {
    export: string;
    import: string;
}

export interface ApiBaseType {
    project: ProjectApiBase
}

export type ApiBaseEntity = keyof ApiBaseType;

export type ApiBaseHandler = keyof ApiBaseType[ApiBaseEntity];