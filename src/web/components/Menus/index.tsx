import * as React from 'react';
import { IMenuItem } from '../../routes/routeConfig';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import { nextId } from '../../../utils/id';


interface IMenusProps extends MenuProps {
    menus: IMenuItem[]
}


export default class Menus extends React.Component<IMenusProps, {}> {
    public render() {
        const {
            menus,
            ...props
        } = this.props;


        const keys: any = menus.map(item => item.key)

        return <Menu {...props}
            defaultOpenKeys={keys}
        >
            {this.renderItems(menus)}
        </Menu>
    }

    renderItems(menus: IMenuItem[]) {
        var menuItems: any = [];

        for (const menu of menus) {
            var component;

            if (menu.render) {

                component = menu.render(menu);

            }
            else if (menu.groups) {
                component = <Menu.ItemGroup key={menu.key || `g-${nextId()}`} title={menu.title}>
                    {this.renderItems(menu.groups)}
                </Menu.ItemGroup>

            }
            else if (menu.items) {

                component = <Menu.SubMenu key={menu.key || menu.url} title={menu.title}>
                    {this.renderItems(menu.items)}
                </Menu.SubMenu>

            }
            else if (menu.divider) {

                component = <Menu.Divider key={nextId()} />

            } else {
                component = <Menu.Item style={{ fontSize: "12px" }} key={menu.key || menu.url}>
                    <Link to={menu.url || ""}>
                        {menu.title}
                    </Link>
                </Menu.Item>

            }
            menuItems.push(component);
        }
        return menuItems
    }
}

