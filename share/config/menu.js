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
                        name:'about',
                        key: 'about',
                        icon:'appstore',
                        url:'/about'
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
]
