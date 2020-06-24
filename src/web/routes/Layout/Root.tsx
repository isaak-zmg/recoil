import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import './style.less'


export default class extends React.Component<any, any> {


    render() {
        const { routes } = this.props.route;

        return (<React.Fragment>
            {renderRoutes(routes)}
        </React.Fragment>);
    }
}
