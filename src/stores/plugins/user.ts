import { di } from 'jsmodules';
import { IAppPlugin, module } from '.';
import { SessionState } from "../sessionState"

/**
 * 用户模块
 */
export class UserPlugin implements IAppPlugin {

    @di.Inject() private sessionState: SessionState

    name = "user";

    __ready__: boolean;

    __installed__: boolean;

    @module
    async install() {
        if (this.sessionState.isAuthenticated) {
            await this.sessionState.getCurrentUserInfo();
        }
    }
}