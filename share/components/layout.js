import React, { Component } from 'react'
import Header2 from './header';
import {Menu, Dropdown, Layout, Icon} from 'antd';
import { menus } from "../config/menu";
import SiderMenu from './SiderMenu';
import Link from 'next/link'
import Router from 'next/router'
import { Tools } from '../util';

const {Sider, Header, Content} = Layout;
const {SubMenu} = Menu;

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

class LayoutIndex extends Component {
    constructor(props) {
        super(props);
        this.state= {
            collapsed: false, //当前侧边栏收起状态
            headerKey: 'home'
        }
    }

    _setHeight = () => {
        const windowHeight = window.innerHeight || document.body.offsetHeight;
        const right = document.querySelector('.right-layout');
        const left = document.querySelector('.left-layout');
        const menu = document.querySelector('.menu-component');
        const isHiddenMenus = window.location.pathname.indexOf('/nomenus') > -1;
        if (right) {
            if (isHiddenMenus) {
                right.style.height = `${windowHeight}px`;
            } else {
                right.style.height = `${windowHeight - 64}px`;
            }
        }
        if (left) {
            left.style.height = `${windowHeight - 64}px`;
        }
        if (menu) {
            menu.style.maxHeight = `${windowHeight - 64}px`;
        }
    }

    componentDidMount() {
        this._setHeight();
    }

    //获取顶部一级菜单
	_getHeaderMenus = (menus)=> {
		return menus.map((item) => {
			return (
				<Menu.Item key={item.key} style={{top: 0}}>
					<span onClick={() => {
                        this.setState({headerKey:item.key})
                        Router.push(item.defaultUrl);
                    }}>{item.name}</span>
				</Menu.Item>
			)
		});
    }

    /**
     * 渲染左侧菜单
     */
    genMenu = () => {
        const { collapsed } = this.state;
        const {router} = this.props;
        let sideMenu = [];
        menus.forEach((ele) => {
            if(ele.key === this.state.headerKey){
                sideMenu = ele.children;
            }
        })
        return menus
            ? (
                <SiderMenu
                    location = {{pathname: Tools.checkServer()?router.asPath:location.pathname}}
                    menu={sideMenu}
                    className="menu-component"
                    collapsed={collapsed}
                    setMenuCollapsed={() => { this.setMenuCollapsed(); }}
                    {...this.props}
                />
            ) : null;
    };

    /**
     * 设置菜单收缩状态
     */
    setMenuCollapsed = (iscollapsed) => {
        const collapsed = iscollapsed || !this.state.collapsed;
        this.setState({ collapsed });
    };
    
    render(){
        const {router} = this.props;
        let defaultSelectedKeys = [];
        let pathname = router.asPath;
        let currentHeaderMenu = [];
        let contentPadding = 15, contentMargin = 12;
        let defaultSelectedHeadKeys = menus && menus[0] && menus[0]['url'] ? [menus[0]['url']] : [];
        
        if (pathname.substring(1, pathname.length)) {
			let pathArr = pathname.split('/');
			let path = pathname.split('/');
			currentHeaderMenu = path[1];
			defaultSelectedHeadKeys = (path[1] === 'welcome' || path[1] === 'permission') ? [menus[0]['url']] : [path[1]];
			pathArr.shift();
			pathArr.shift();
			pathArr.pop();
			pathArr.pop();
			pathArr.push(pathname.replace(/\/((new)|(edit)|(detail)|(show)|(dcDetail)|(saleDetail)|(fixsh)|(fixnj)|(listjz)|(listnj))$/, '/list'));
			defaultSelectedKeys = pathArr;
        }
        currentHeaderMenu='home'
        return (
            <Layout className="container">
                <Header className="header">
                    <div className="logoContainer" style={{overflow: 'hidden'}}>
                        <Link href="/"><a><img src="https://res1.bnq.com.cn/FjJl2yF8r1DWzudbfQBLa6lkQadX" alt="牛匠到家平台" className="logo"/></a></Link>
                        <span className="title" ref="memberTitle">牛匠到家平台</span>
                    </div>
                    <Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={defaultSelectedHeadKeys}
						selectedKeys={this.state.headerKey}
						style={{lineHeight: '64px', display: 'inline-block'}}
					>
						{this._getHeaderMenus(menus)}
					</Menu>
                </Header>
                <Layout>
                    {
                        this.genMenu()
                    }
					{/* <Sider
						width={250}
						trigger={null}
						collapsible
						collapsed={this.state.collapsed}
						style={{background: '#fff', paddingTop: '5px'}}
						className="ant-layout-sider-ie9 left-layout"
					>
						<div className="menu-container">
							<Menu
								mode={this.state.collapsed ? 'vertical' : 'inline'}
								selectedKeys={defaultSelectedKeys}
								onSelect={this._onSelect}
								className="menu-component"
								openKeys={this.state.openKeys}
								onOpenChange={this._onOpenChange}
							>
                                {this._getMenus(menus,currentHeaderMenu)}
								<SubMenu key="sub2" title="Navigation Two">
                                    <Menu.Item key="4" onClick={() => {
                                        Router.push('/')
                                    }}>index</Menu.Item>
                                    <Menu.Item key="5" onClick={() => {
                                        Router.push('/about')
                                    }}>about</Menu.Item>
                                    <Menu.Item key="6">
                                        <Link href='/home'><a>home</a></Link>
                                    </Menu.Item>
                                    <SubMenu key="sub3" title="Submenu">
                                        <Menu.Item key="7">Option 7</Menu.Item>
                                        <Menu.Item key="8">Option 8</Menu.Item>
                                    </SubMenu>
                                </SubMenu>
							</Menu>
						</div>
					</Sider> */}
					<Layout className='right-layout' style={{background: '#eee', overflowX: 'auto'}}>
						<Content style={{
							background: '#fff',
							padding: contentPadding,
							margin: contentMargin,
							minHeight: "auto",
							position: "relative"
						}}>
                            {
                                this.props.children
                            }
						</Content>
					</Layout>
				</Layout>
            </Layout>
        )
    }
}

export default LayoutIndex