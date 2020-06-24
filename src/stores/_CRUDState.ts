import { CRUDService } from '../services/_CRUDService';
import { observable } from "mobx";
import { LoadingStatus } from "@/config/global";



import * as _ from 'lodash';
import { di } from 'jsmodules';
//import { ServerTimeState } from './serverTime';
import moment from 'moment';

export class RecordState {
    //@di.Inject() serverTimeState: ServerTimeState
    
    constructor(public RecordService: CRUDService) {

    }

    record = null;
    @observable status = LoadingStatus.loading;
    async load(id, convert?, auth?) {
        try {
            this.status = LoadingStatus.loading;
            var res = await this.RecordService.get(id, auth);
            //this.serverTimeState.set(res.headers.date)
            this.set(res.data.result, convert)
        } catch (ex) {
            this.status = LoadingStatus.fail;
            throw ex;
        }
    }
    async set(state, convert?) {
        this.record = !!convert ? convert(state) : state;
        this.status = LoadingStatus.success;
    }
    reset() {
        this.record = null;
        this.status = LoadingStatus.loading;
        return this;
    }
}

export class CRUDState {
    //@di.Inject() serverTimeState: ServerTimeState


    constructor(public recordService, public onCreateItemState?: (data) => any) {
    
    }


    private get RecordService(): CRUDService {
        if (_.isString(this.recordService)) {
            return di.Resolve(this.recordService);
        }
        if (_.isFunction(this.recordService)) {
            return this.recordService();
        }
        return this.recordService;
    }

    recordState = new RecordState(this.RecordService)

    @observable status = LoadingStatus.loading;

    pagination = {
        current: 1,
        pageSize: 20,
        total: 0,
        pageSizeOptions: ['20','50','100'],
        showSizeChanger: true
    }

    query = {}

    records = [];
    recordsObj = {}


    page(page, pageSize?) {
        this.pagination.current = page;
        if (pageSize) {
            this.pagination.pageSize = pageSize;
        }
        return this;
    }
    filter(query = null, clear = false) {
        if (query) {
            if (clear) {
                this.query = query;
            } else {
                this.query = { ...this.query, ...query };
            }
        } else {
            this.query = {};
        }
        return this.page(1);
    }

    @observable totalCount = 0

    async loadRecords() {
        this.status = LoadingStatus.loading;
        try {
            var res = await this.RecordService.getPagesData(this.pagination, this.query);
            //this.serverTimeState.set(res.headers.date)
            var { result } = res.data;
            this.pagination.total = +result.total_count;
            this.totalCount = +result.total_count
            if (this.onCreateItemState) {
                this.records = _.map(result.items, (item) => {
                    return this.onCreateItemState(item);
                });
            } else {
                this.records = result.items;
            }
            this.status = LoadingStatus.success;
        }
        catch (ex) {
            if (ex.status == 403) {
                this.records = [];
                alert("没有权限");
            }
            this.status = LoadingStatus.fail;
            throw ex;
        }
    }

    get(id, auth?) {
        return this.RecordService.get(id, auth);
    }

    update(record) {
        return this.RecordService.update(record.id, record);
    }

    @observable creactStatus = LoadingStatus.success
    async create(record) {
        this.creactStatus = LoadingStatus.loading;
        try {
            var res = await this.RecordService.create(record);
            this.creactStatus = LoadingStatus.success;
            return res
        } catch (error) {
            this.creactStatus = LoadingStatus.fail;
            throw error;
        }
        

    }

    remove(record) {
        return this.RecordService.remove(record.id);
    }

}