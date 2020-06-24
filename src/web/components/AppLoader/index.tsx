import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppState } from '../../../stores/app';
import { di } from 'jsmodules';
import { Modal } from 'antd';
import {
    LoadingOutlined,
} from '@ant-design/icons';

import './style.less';


class AppLoader extends React.Component<{}, {}> {

    @di.Inject() app: AppState;

    public render(): JSX.Element {
        return (<Modal visible={true}
            zIndex={100000}
            width={240}
            wrapClassName="vertical-center-modal"
            footer={null}
            closable={false}
            maskClosable={false}
            style={{ width: "120px", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            <div className="app-loader-icon">
                <LoadingOutlined style={{ marginRight: 12 }} />
                loading...
                </div>
        </Modal>);
    }

    static show() {
        var div = document.createElement("div");
        document.body.appendChild(div);
        ReactDOM.render(<AppLoader />, div);
        return {
            close: () => {
                const unmontResult = ReactDOM.unmountComponentAtNode(div);
                if (unmontResult && div.parentNode) {
                    div.parentNode.removeChild(div);
                }
            }
        };
    }

    static async loading(action?) {
        var loader = null;
        let timer = setTimeout(function () {
            loader = AppLoader.show();
        }, 200);
        try {
            return await action;
        } catch (ex) {
            throw ex;
        }
        finally {
            clearTimeout(timer)
            if (loader) {
                setTimeout(function () {
                    loader.close();
                }, 200);
            }
        }

    }
}

export default AppLoader;
