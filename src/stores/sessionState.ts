import { Events } from 'jsmodules/lib/events';
import { observable } from 'mobx';
import { di } from 'jsmodules';
import TokenService from '../services/tokenService';
import UserService from '../services/user';



export class SessionState extends Events {
    @di.Inject() tokenService: TokenService
    @di.Inject() userService: UserService

    constructor() {
        super();
    }

    @observable isAuthenticated = false;

    roles = []
    user

    async login(username, password) {
        try {
            await this.tokenService.login(username, password);
            var accountRes = await this.userService.me();
            this.roles = accountRes.data.result.roles
            this.user = accountRes.data.result

            this.isAuthenticated = true;

        }
        catch (ex) {
            throw ex
        }
    }

    async getCurrentUserInfo() {

        try {
            var accountRes = await this.userService.me();
            this.user = accountRes.data.result;
            this.roles = accountRes.data.result.roles || []
            this.isAuthenticated = true;
        }
        catch (ex) {
            this.isAuthenticated = false;
            return ex.message
        }
    }

    async logout() {
        await this.tokenService.clear();
        this.roles = []
        this.isAuthenticated = false;
        this.user = null;
    }

}