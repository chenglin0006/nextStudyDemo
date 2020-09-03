import React, { Component } from 'react'
import Header2 from './header';
import {Menu, Dropdown, Layout, Icon} from 'antd';
import { menus } from "../config/menu";
import SiderMenu from './SiderMenu';
import Link from 'next/link'
import Router from 'next/router'
import { Tools } from '../util';
import { TreeIterator } from '../util';

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
        const {router} = this.props;
        let pathname = router.asPath;
        let keys = TreeIterator.filterIncludesParents(menus, (item) => {
            return pathname == item.url;
        }).reverse().map((m) => {
            return m.key;
        });
        this.setState({headerKey: keys[0]})
    }

    //获取顶部一级菜单
	_getHeaderMenus = (menus)=> {
		return menus.map((item) => {
			return (
				<Menu.Item key={item.key} style={{top: 0}} onClick={() => {
                    this.setState({headerKey:item.key})
                    Router.push(item.defaultUrl);
                }}>
					<span>{item.name}</span>
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
        let contentPadding = 15, contentMargin = 12;
        return (
            <Layout className="container">
                <Header className="header">
                    <div className="logoContainer" style={{overflow: 'hidden'}}>
                        <Link href="/"><a><img src="https://res1.bnq.com.cn/d2c224bc-340c-451d-846b-cb70db8e8666?t=1584754406909" alt="NEXT STUDY" className="logo"/></a></Link>
                        <span className="title" ref="memberTitle">NEXT STUDY</span>
                    </div>
                    <Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={this.state.headerKey}
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