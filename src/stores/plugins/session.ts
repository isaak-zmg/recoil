import { di } from 'jsmodules';
import { IAppPlugin, module } from '.';
import { SessionState } from '../sessionState';
import TokenService from '../../services/tokenService';


export enum UserStatus {
    none,
    loading,
    local,
    success
}

/**
 * 用户模块
 */
export class SessionPlugin implements IAppPlugin {


    @di.Inject() private tokenService: TokenService;

    @di.Inject() private sessionState: SessionState

    name = "session";

    __ready__: boolean;

    __installed__: boolean;


    @module
    async install() {
        var access_token = await this.tokenService.getAccessToken();
        if (access_token) {
            this.sessionState.isAuthenticated = true;
        }
    }
}