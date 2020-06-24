import React from 'react';
import { observer } from 'mobx-react';
import { Avatar, Dropdown, Menu, Button, Divider } from 'antd';
import { di } from 'jsmodules';
import { SessionState } from "../../../stores/sessionState";
import { LogoutOutlined, CaretDownOutlined, UserOutlined } from '@ant-design/icons'


@observer
export default class LayoutHeader extends React.Component<any, any>{
    @di.Inject() sessionState: SessionState


    logout = () => {
        this.sessionState.logout()
    }

    render() {

        const menu = (
            <div style={{
                minWidth: 200,
                marginTop: 12,
                padding: "16px 24px",
                boxShadow: "0 10px 30px 0 rgba(82,63,105,.08)",
                background: "#fff"
            }}>

                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 8 }}>
                        <Avatar shape="square" size={48} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 600 }}>
                        {this.sessionState.user.nickname}
                    </div>
                </div>

                <Divider></Divider>
                <Menu style={{
                    border: "none",
                }}
                    selectedKeys={[]}
                >
                    <Menu.Item>
                        <a onClick={this.logout}><LogoutOutlined /><span>Logout</span></a>
                    </Menu.Item>
                </Menu>
            </div>

        );

        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                height: 64
            }}>
                <div style={{ flex: 1 }}></div>
                <div>
                    <Dropdown
                        overlay={menu}
                        trigger={['click']}
                    >

                        <div className="login-cell" style={{ display: "flex", alignItems: "baseline" }}>
                            <div style={{ fontSize: 20, fontWeight: 600 }}>{this.sessionState.user.nickname}</div>
                            <div style={{ marginLeft: 4 }}><CaretDownOutlined /></div>
                        </div>

                    </Dropdown>
                </div>
            </div>
        )
    }
}