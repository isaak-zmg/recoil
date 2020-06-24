import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from './routeConfig';
import { di } from 'jsmodules';
import AppState, { AppStatus } from '../../stores/app';
import SplashScreen from '../components/SplashScreen'
import { observer } from 'mobx-react';


@observer
class AppRouter extends React.Component<{}, {}> {
    @di.Inject() app: AppState

    componentWillMount() {
        this.app.start()
    }

    public render() {
        if (this.app.status == AppStatus.starting) {
            return <SplashScreen />
        }

        return <BrowserRouter>
            {renderRoutes(routes)}
        </BrowserRouter>
    }
}

export default AppRouter;
