import { observable } from "mobx";
import { Events } from "jsmodules/lib/events";
import { IAppPlugin } from "./plugins";
import { SessionPlugin } from "./plugins/session";
import { UserPlugin } from "./plugins/user"


export enum AppStatus {
    starting = "starting",
    error = "error",
    ready = "ready"
}

export class AppState extends Events {
    error = [];

    /**
     * app 状态
     */
    @observable status: AppStatus = null;

    plugins: { [name: string]: IAppPlugin } = {
        // setting: new SettingPlugin(),
        session: new SessionPlugin(),
        user: new UserPlugin(),
    };

    use(module: IAppPlugin) {
        this.plugins[module.name] = module;
        return this;
    }

    /**
     * 启动应用
     */
    public async start(tryStart = 0) {
        //moment.locale('zh-cn')
        this.status = AppStatus.starting;
        var status = AppStatus.ready;
        this.error = [];
        for (var name in this.plugins) {
            const plugin = this.plugins[name];
            if (!plugin.__ready__) {
                var error = await plugin.install();
                if (error) {
                    this.error.push(error);
                    status = AppStatus.error;
                }
            }
        }
        if (status == AppStatus.error && tryStart < 3) {
            await this.start(tryStart + 1);
        }
        this.status = status;
    }
}

export default AppState;