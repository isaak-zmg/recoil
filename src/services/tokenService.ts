import { di, HttpFactory } from 'jsmodules';
import { IKeyValueStorage } from '../storage/IKeyValueStorage';



const STORAGE_KEY = 'xxx_token';


export default class TokenService {
    @di.Inject() kvStorage: IKeyValueStorage;
    @di.Inject() identity_api_v1: HttpFactory


    private target: {
        token_type: string;
        access_token: string;
    };

	/**
     * 将 access_token 保存到本地
     * @param obj
     */
    async save(obj) {
        
        return this.kvStorage.setObjectAsync(STORAGE_KEY, obj);
    }

	/**
     * 读取本地保存的 access_token
     */
    private async read() {
        if (this.target) {
            return;
        }
        var token = await this.kvStorage.getObjectAsync(STORAGE_KEY);
        if (token) {
            this.target = token;
        } else {
            this.target = null;
        }
    }

    async clear() {
        this.target = null;
        await this.kvStorage.removeAsync(STORAGE_KEY);
    }

    async getAccessToken() {
        await this.read();
        if (!this.target) {
            return null;
        }
        return this.target.access_token;
    }

    async getSecurityHeaders() {
        await this.read();
        if (this.target) {
            const { token_type, access_token } = this.target;
            return { Authorization: `${token_type} ${access_token}` };
        }
        return null;
    }

    async login(username, password) {
        var res = await this.identity_api_v1.url(`/../connect/token`).headers({
            Authorization: 'Basic cmVzb3VyY2Vvd25lcjpzb3VubWF0ZQ=='
        }).isForm().post({
            grant_type: "password",
            username,
            password,
        });
        this.target = res.data;
        await this.save(this.target);
    }


    changeTarget(data){
        this.target = data
    }
}