import { di, HttpFactory } from 'jsmodules';
import TokenService from './tokenService';
import { IResponseBuilder } from 'jsmodules/lib/http/interface';
import { __PAGE_SIZE__ } from '@/config/global';


interface IPageDataResponse<T> {
    total_count: number;
    items: T[];
}


export class CRUDService {
    record_api: HttpFactory;
    @di.Inject() tokenService: TokenService;

    constructor(public api, private httpFactory: string) {
        this.record_api = di.Resolve(httpFactory)
    }

    async getPagesData(pageInfo: any = {}, query?, auth = true): Promise<IResponseBuilder> {
        var page = pageInfo.current || 1,
            pageSize = pageInfo.pageSize || __PAGE_SIZE__;
        var start = (page - 1) * pageSize;
        var headers = await this.tokenService.getSecurityHeaders();
        return this.record_api.url(this.api).addSecurityHeaders(auth).get({
            ...query,
            skip: start,
            limit: pageSize
        });
    }
    async get(id, auth = true) {
        return this.record_api.url(`${this.api}/${id}`).addSecurityHeaders(auth).get();
    }
    async create(data, auth = true) {
        return this.record_api.url(this.api).addSecurityHeaders(auth).post(data);
    }
    async update(id, data, auth = true) {
        return this.record_api.url(`${this.api}/${id}`).addSecurityHeaders(auth).put(data)
    }

    async remove(id, auth = true) {
        return this.record_api.url(`${this.api}/${id}`).addSecurityHeaders(auth).remove({});
    }
}