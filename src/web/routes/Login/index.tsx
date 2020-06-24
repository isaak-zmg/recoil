import * as React from 'react';
import { RouteComponentProps } from "react-router";
import "./style.less"
import { LoginForm } from './components/LoginForm';
import { di, qs } from 'jsmodules';
import { SessionState } from '../../../stores/sessionState';
import { notification } from 'antd';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import AppLoader from '../../components/AppLoader'



export interface ILoginProps extends RouteComponentProps {
}


@observer
export default class Login extends React.Component<ILoginProps> {
    @di.Inject() sessionState: SessionState

    handleSubmit = async (values) => {
        var loader = AppLoader.show();

        try {
            await this.sessionState.login(values.username, values.password);
        } catch (err) {
            notification.error({
                message: "wrong user name or password",
                description: err.message
            });
        } finally {
            loader.close();
        }
    }

    public render() {
        var { search } = this.props.location;
        const queryParams = qs.decode(search) || {};
        const next = queryParams.next || "/";

        if (this.sessionState.isAuthenticated) {
            return (
                <Redirect to={next} />
            )
        }

        return (
            <div className="login-container">
                <div className="login-page">
                    <div className="login-logo">
                        logo
                    </div>

                    <div>
                        <LoginForm onSubmit={this.handleSubmit} />
                    </div>

                </div>
            </div>
        );
    }
}
