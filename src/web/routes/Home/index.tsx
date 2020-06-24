import React from 'react';
import { Redirect } from 'react-router-dom';


export default class Home extends React.Component<any, any> {
    render() {
        return (
            <Redirect to="/users"></Redirect>
        );
    }
}


