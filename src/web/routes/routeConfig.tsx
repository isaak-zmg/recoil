import * as React from 'react'
import {
    UserOutlined,
    SnippetsOutlined
} from '@ant-design/icons';


export interface IMenuItem {
    divider?: boolean,
    key?: string,
    url?: string,
    title?: any,
    groups?: IMenuItem[],
    items?: IMenuItem[],
    render?: (menu: IMenuItem) => React.ReactNode
}


export const menus: IMenuItem[] = [
    {
        title: <span><UserOutlined /><span>User Manage</span></span>,
        key: "user_manage",
        items: [
            {
                url: "/users",
                title: <span><UserOutlined /><span>User</span></span>
            },
            {
                url: "/todos",
                title: <span><SnippetsOutlined /><span>Todos</span></span>
            }
        ]
    }

]


export const routes = [
    {
        component: require('./Layout/Root').default,
        routes: [
            {
                path: "/login",
                component: require('./Login').default
            },
            
            {
                path: '/',
                component: require('./Layout/Layout').default,
                routes: [
                    {
                        path: "/users",
                        component: require("./Users").default,
                        routes: [
                            {
                                path: "/users",
                                component: require("./Users/UsersCon").default
                            }
                        ]
                    },

                    {
                        path: "/todos",
                        component: require("./Todos").default,
                        routes: [
                            {
                                path: "/todos",
                                component: require("./Todos/TodosCon").default
                            }
                        ]
                    },

                    {
                        path: "/",
                        exact: true,
                        component: require("./Home").default
                    }
                ]
            }
        ]
    }
]