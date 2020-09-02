import React, { Component } from 'react'
import Header2 from './header';
import {Menu, Dropdown, Layout, Icon} from 'antd';
import { menus } from "../config/menu";
import Link from 'next/link'
import Router from 'next/router'

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
			openKeys: this._getOpenKes('sub') || [], //当前展开的SubMenu菜单项key数组
			rootSubMenuKeys: this._getRootSubmenKeys(menus) || [],
			isShowUserOption: false,
			isShowResetPasswrod: false
        }
    }

    //获取顶部一级菜单
	_getHeaderMenus = (menus)=> {
		return menus.map((item) => {
			return (
				<Menu.Item key={item.url} style={{top: 0}}>
					<Link href={item.defaultUrl}>
						<span>{item.name}</span>
					</Link>
				</Menu.Item>
			)
		});
    }

    _getRootSubmenKeys = (menus) => {
		let arr = [];
		let currentSubMenus;
		if(!this._getOpenKes()) {
			currentSubMenus = menus[0]['children'];
		}else {
			for(let j=0; j<menus.length; j++) {
				if(this._getOpenKes()[0] === menus[j]['url']) {
					currentSubMenus = menus[j]['children'];
				}
			}
		}
		

		for(let i=0; i<currentSubMenus.length; i++) {
			arr.push(currentSubMenus[i]['url']);
		}
		
		return arr;
	}
    
    // 递归生成菜单
	_getSubMenus = (menus) => {
		return menus.map((item) => {
			if (item.children) {
				return (
					<SubMenu
						key={item.url}
						title={<span><Icon type={item.icon}/><span>{item.name}</span></span>}
					>
						{this._getSubMenus(item.children)}
					</SubMenu>
				)
			}
			return (
				<Menu.Item key={item.url}>
					{/* <Link href={item.url}>
						<Icon type={item.icon}/><span>{item.name}</span>
                    </Link> */}
                    <span>{item.name}</span>
				</Menu.Item>
			)
		})
	}
	
	_getOpenKes = (type,pathname='/') =>{
		if (pathname.substring(1, pathname.length)) {
			let pathArr = pathname.split('/');
			if (pathArr[1] == 'welcome' || pathArr[1] == 'permission') {
				return [menus[0]['url']];
			}
			// if (type !== 'sub') return [pathArr[1]];
			// if (type === 'sub') {
			// 	pathArr.shift();
			// 	pathArr.shift();
			// 	pathArr.pop();
			// 	return pathArr;
            // }
            pathArr = ["anju", "equityCard"]
            return pathArr;
		
		}
    }

    _getMenus = (menus, currentHeaderMenu) => {
		//获取一级导航对应的子导航
		//如果当前路由为welcome、permission时，默认当前currentHeaderMenu为菜单（menu.js）中第一个
		if (currentHeaderMenu == 'welcome' || currentHeaderMenu == 'permission') {
			currentHeaderMenu = menus[0]['url'];
		}
        let subMenus = [];
		for (let i = 0; i < menus.length; i++) {
			if (menus[i]['url'] === currentHeaderMenu) {
				subMenus = menus[i]['children'];
			}
		}
		
		return this._getSubMenus(subMenus);
	}

    _onOpenChange = (openKeys) => {
		const that = this;
	    const latestOpenKey = openKeys.find(function(key) {
	    	return that.state.openKeys && that.state.openKeys.indexOf(key) === -1
	    });
	    if (this.state.rootSubMenuKeys.indexOf(latestOpenKey) === -1) {
	      	that.setState({ openKeys });
	    } else {
		    that.setState({
		        openKeys: latestOpenKey ? [latestOpenKey] : [],
		    });
	    }

	}
    
    _onSelect = ({key}) => {
		//通过key来判断当前菜单是否被subMenu包裹
		let arr = key.split('/');
		if (arr.length === 4) {
			this.setState({
				openKeys: []
			})
		}
	}
    
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
                        <Link href="/"><img src="https://res1.bnq.com.cn/FjJl2yF8r1DWzudbfQBLa6lkQadX" alt="牛匠到家平台" className="logo"/></Link>
                        <span className="title" ref="memberTitle">牛匠到家平台</span>
                    </div>
                    <Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={defaultSelectedHeadKeys}
						selectedKeys={defaultSelectedHeadKeys}
						style={{lineHeight: '64px', display: 'inline-block'}}
					>
						{this._getHeaderMenus(menus)}
					</Menu>
                </Header>
                <Layout>
					<Sider
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
                                        <Link href='/home'>home</Link>
                                    </Menu.Item>
                                    <SubMenu key="sub3" title="Submenu">
                                        <Menu.Item key="7">Option 7</Menu.Item>
                                        <Menu.Item key="8">Option 8</Menu.Item>
                                    </SubMenu>
                                </SubMenu>
							</Menu>
						</div>
					</Sider>
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