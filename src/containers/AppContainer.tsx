import React from "react";
import { di, HttpFactory } from 'jsmodules';
import { WebKeyValueStorage } from '../storage/web/KeyValueStorage';
import TokenService from '../services/tokenService';
import { AutoHttpFactory } from '../utils/http';
import hosts from '../config/host'
import UserService from '../services/user'
import { SessionState } from '../stores/sessionState';
import AppState from '../stores/app'

const { container } = di;

container.bind('httpFactory').to(HttpFactory);
container.bind('identity_api_v1').toFactory(AutoHttpFactory).params(hosts.identity_api);

container.bind('kvStorage').to(WebKeyValueStorage).params('Main').isSingletonScope();

container.bind('app').to(AppState).isSingletonScope();

container.bind('tokenService').to(TokenService).isSingletonScope();

container.bind("sessionState").to(SessionState).isSingletonScope()



container.bind("userService").to(UserService).isSingletonScope()


export function AppContainer(props) {
    return <React.Fragment>{props.children}</React.Fragment>;
}
