export const ContentType = {
    Gzip: 'application/gzip',
    Json: 'application/json',
    JsonUtf8: 'application/json; charset=utf8',
};

export const apig = {
    logLevel: 'INFO',
    metricsEnabled: true,
    origin: '*',
};

export const AccessExposeHeaders = 'X-Pagination-Index,X-Pagination-Size,X-Pagination-TotalCount';

export interface IOptionsHttpResponse {
    err?: any;
    message?: any;
    data?: any;
    status?: number;
    excludeStack?: any;
    code?: string;
    details?: any;
}

export const IdDataTypes = {
    Integer: 'Integer',
    UuidV1: 'UuidV1',
    UuidV4: 'UuidV4',
};
