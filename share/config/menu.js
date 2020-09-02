export const menus = [
	{
		name: '家装',
        url: 'home',
        key: 'home',
		icon: 'appstore',
        defaultUrl: '/home',
		children: [
            {
                name:'权益管理',
                url:'anju',
                key: 'anju',
                icon:'appstore',
                defaultUrl:'/home',
                children:[
                    {
                        name:'index',
                        key: 'index',
                        icon:'appstore',
                        url:'/'
                    },
                    {
                        name:'home',
                        key: 'home',
                        icon:'appstore',
                        url:'/home'
                    },
                ]
            },
		]
    },
    {
		name: '测试',
        key: 'test',
		icon: 'appstore',
        defaultUrl: '/about',
		children: [
            {
                name:'about',
                url:'anju',
                key: 'anju',
                icon:'appstore',
                defaultUrl:'/about',
                children:[
                    {
                        name:'about',
                        key: 'about',
                        icon:'appstore',
                        url:'/about'
                    },
                ]
            },
		]
    },
]
