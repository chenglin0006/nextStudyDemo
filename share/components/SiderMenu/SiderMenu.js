import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import  Link from 'next/link';
import { TreeIterator } from '../../util';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderMenu extends Component {
    static propTypes = {
        location: PropTypes.object,
        menu: PropTypes.array,
        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        collapsed: PropTypes.bool,
        isMobile: PropTypes.bool,
        isIframe: PropTypes.bool,
        defaultOpenKeys: PropTypes.array,
    };

    static defaultProps = {
        location: {},
        menu: [],
        children: [],
        collapsed: false,
        isMobile: false,
        isIframe: false,
        defaultOpenKeys: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
        };
        this.defaultOpen = true;
    }

    componentWillReceiveProps(nextProps) {
        if (this.defaultOpen && nextProps.menu && nextProps.menu.length > 0) {
            this.setState({
                openKeys: this.getCurrentOpenKey(nextProps.menu),
            });
        }
    }

    /**
     *  根据路由地址获取获取当前展开菜单keys
     */
    getCurrentOpenKey = (menu) => {
        this.defaultOpen = false;
        const { location: { pathname } } = this.props;
        return menu ? TreeIterator.filterIncludesParents(menu, (item) => {
            return pathname.indexOf(item.path) > -1;
        }).map((m) => {
            return m.key || m.path;
        }) : [];
    };

    /**
     *  根据路由地址获取获取当前选中菜单key
     */
    getSelectedMenuKeys = () => {
        const { location: { pathname }, menu } = this.props;
        const tree = TreeIterator.filter(menu, (item) => {
            return pathname.indexOf(item.path) > -1;
        });
        return tree.map((m) => {
            return m.key || m.path;
        });
    };

    /**
     * 生成菜单
     */
    getNavMenuItems(menusData) {
        debugger;
        const { pathname } = this.props.location;
        if (!menusData) {
            return [];
        }
        return menusData.map((item) => {
            if (!item.name) {
                return null;
            }
            if (!item.loaded && false) {
                return null;
            }
            let itemPath;
            if (item.path && item.path.indexOf('http') === 0) {
                itemPath = item.path;
            } else {
                itemPath = `/${item.path || ''}`.replace(/\/+/g, '/');
            }
            if (item.children && item.children.some((child) => { return child.name; })) {
                return item.hideInMenu ? null
                    : (
                        <SubMenu
                            title={
                                item.icon ? (
                                    <span className="menu-item">
                                        <Icon type={item.icon} />
                                        <span>{item.name}</span>
                                    </span>
                                ) : item.name
                            }
                            key={item.key || item.path}
                        >
                            {this.getNavMenuItems(item.children)}
                        </SubMenu>
                    );
            }
            const icon = item.icon && <Icon type={item.icon} />;
            return item.hideInMenu ? null
                : (
                    <Menu.Item key={item.key || item.path} className="menu-item">
                        {
                            /^https?:\/\//.test(itemPath) ? (
                                <a href={itemPath} target={item.target}>
                                    {icon}
                                    <span>{item.name}</span>
                                </a>
                            ) : (
                                <Link
                                    href={item.url}
                                >
                                    <a>{item.name}</a>
                                </Link>
                            )
                        }
                    </Menu.Item>
                );
        });
    }

    /**
     * 菜单展开控制
     */
    handleOpenChange = (openKeys) => {
        const { menu = [] } = this.props;
        const lastOpenKey = openKeys[openKeys.length - 1];
        const openKey = TreeIterator.filterIncludesParents(menu, (item) => {
            return item.children && (item.key || item.path) === lastOpenKey;
        }).map((m) => {
            return m.key || m.path;
        });
        this.setState({
            openKeys: openKey,
        });
    };

    render() {
        const {
            collapsed, menu, defaultOpenKeys,
        } = this.props;
        const menuProps = collapsed ? {} : {
            openKeys: this.state.openKeys,
        };
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="ant-layout-sider-ie9 left-layout"
                mode={collapsed ? 'vertical' : 'inline'}
                width="250px"
            >
                <div className="menu-container">
                    <Menu
                        defaultOpenKeys={defaultOpenKeys}
                        mode="inline"
                        {...menuProps}
                        onOpenChange={this.handleOpenChange}
                        selectedKeys={this.getSelectedMenuKeys()}
                        style={{ width: '100%' }}
                        className="menu-component"
                    >
                        {this.getNavMenuItems(menu)}
                    </Menu>
                </div>
            </Sider>
        );
    }
}
