import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { menus } from '../routeConfig'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Menus from '../../components/Menus';
import { observer } from 'mobx-react';
import { di } from 'jsmodules';
import { SessionState } from '../../../stores/sessionState';
import { Redirect } from 'react-router-dom';
import LayoutHeader from './LayoutHeader'



const { Header, Sider } = Layout

export interface ILayoutProps extends RouteComponentProps {
    route: any
}


@observer
export default class MainLayout extends React.Component<ILayoutProps> {
    @di.Inject() sessionState: SessionState

    state = {
        collapsed: false
    }

    toggole = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    public render() {

        var { route, location } = this.props;
        const { routes } = route;

        if (!this.sessionState.isAuthenticated) {
            return <Redirect to="/login"></Redirect>
        }

        let navs = menus

        const theMatchRoutes = matchRoutes(routes, location.pathname)


        const selectedKeys = theMatchRoutes.map(item => {
            return item.match.path
        })


        return (
            <Layout className='main-layout'>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.toggole}
                    style={{
                        overflow: "auto",
                        background: "#fff",
                        boxShadow: "0 0 28px 0 rgba(82,63,105,.08)"
                    }}
                >
                    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
                        <div style={{ height: 68, textAlign: "center", lineHeight: "68px", fontWeight: 600 }}>
                            logo
                            </div>

                        <div style={{ flex: 1 }}>
                            <Menus theme="light"
                                mode="inline"
                                selectedKeys={selectedKeys}
                                style={{ border: "none" }}
                                menus={navs}>
                            </Menus>
                        </div>


                        <div className="menu-toggle">
                            {
                                this.state.collapsed ?
                                    <MenuFoldOutlined onClick={this.toggole} />
                                    :
                                    <MenuUnfoldOutlined onClick={this.toggole} />
                            }
                        </div>

                    </div>
                </Sider>
                <Layout>
                    <Header style={{ background: "#fff" }}>
                        <LayoutHeader></LayoutHeader>
                    </Header>
                    <Layout.Content style={{ overflow: "auto", background: "#eef0f8" }} id="scroll-container" >
                        {renderRoutes(routes)}
                    </Layout.Content>
                </Layout>
            </Layout>
        );
    }
}
