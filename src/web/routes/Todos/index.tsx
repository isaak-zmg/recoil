import * as React from 'react';

import { renderRoutes } from 'react-router-config'

export default class extends React.Component<any, any>{
    render() {
        const { route } = this.props
        return  <React.Fragment>
            {renderRoutes(route.routes)}
        </React.Fragment>
        
    }
}