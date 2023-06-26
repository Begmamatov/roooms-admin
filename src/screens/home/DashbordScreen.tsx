import {
    AppstoreAddOutlined,
    AppstoreOutlined,
    BuildOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, MenuProps, theme } from 'antd';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useOutlet } from "react-router-dom";
import useRootStore from "../../hooks/useRootStore";

import styled from "styled-components";

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to='/'>Bosh sahifa</Link>, '1', <HomeOutlined />),
    getItem(<Link to='/posts'>Postlar</Link>, '2', <AppstoreOutlined />),
    getItem(<Link to='/add-post'>Post qo'shish</Link>, '3', <AppstoreAddOutlined />),
    getItem('Uskunalar', 'sub1', <BuildOutlined />, [getItem(<Link to='/'>B1 uskuna</Link>, '6'), getItem(<Link to='/'>B2 uskuna</Link>, '8')]),
    getItem(<Link to='/'>Sozlamalar</Link>, '9', <SettingOutlined />),
];

function DashbordScreen() {

    const store = useRootStore();
    const navigate = useNavigate();

    const logout = () => {
        store.loginWithFirebaseStore.logout();
        if (!store.loginWithFirebaseStore.user) {
            navigate("/login", { replace: true });
        }
    };

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    return (
        <HomeLayout>
            <Layout className="box">
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className='logoBox' >
                        <img src="/logo3.png" alt="" style={{ width: collapsed ? '50px' : '100px' }} />
                    </div>
                    <Menu theme='dark' mode='inline' items={items} />
                </Sider>
                <Layout>
                    <Header style={{ background: colorBgContainer }} className="header">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div>
                            <Avatar style={{ backgroundColor: '#F25019' }} icon={<UserOutlined />} />
                            <Button
                                onClick={logout}
                                className="logoutBtn"
                                type="text">
                                Log out
                            </Button>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </HomeLayout>
    );
};

export default DashbordScreen


const HomeLayout = styled.div`
    width: 100vw;
    height: 100vh;

    .box {
        height: 100%;
        width: 100%;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px 0 0;
    }

    .logoutBtn {
        color: #000000;
        margin-left: 10px;
    }

    .logoBox {
        margin: 20px auto;
        background-color: 'rgba(255, 255, 255, 0.2)';
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`