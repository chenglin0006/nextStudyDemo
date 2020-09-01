export const menus = [
	{
		name: '家装',
		url: 'home',
		icon: 'appstore',
        defaultUrl: '/home',
		children: [
            {
                name:'权益管理',
                url:'anju',
                icon:'appstore',
                defaultUrl:'/home',
                children:[
                    {
                        name:'权益卡管理',
                        icon:'appstore',
                        url:'/home/anju/equityCard/list'
                    },
                ]
            },
		]
	}
]
