const url = {
	development: {
		targetUrl: 'https://drm-test.bnq.com.cn',
		apiUrl: 'http://web.futureshop.dev-zt.bnq.com.cn:3008',
		apiUrlFilter: '/drmAdmin',
		authUrl: 'https://auth-test.bnq.com.cn',
		loginAddress: 'https://auth-test.bnq.com.cn/login/login.html',
		authUrlFilter: '/auth',
		port: 3008,
		autoOpenBrowser: true,
		proxyFilter: '/drmAdmin',
		addressUrl: 'http://areas-test.bnq.com.cn/areas/area',
		exportUrl:'http://drm-test.bnq.com.cn',
		qiniuUrl:'http://xres.bnq.com.cn/file',//不支持https
	},
	prodDev: {
		apiUrl: '//drm-dev.bnq.com.cn',
		apiUrlFilter: '/drmAdmin',
		addressUrl: 'http://areas-dev.bnq.com.cn/areas/area',
		authUrl: '//auth-dev.bnq.com.cn',
		loginAddress: '//auth-dev.bnq.com.cn/login/login.html',
		authUrlFilter: '/auth',
		exportUrl:'//drm-dev.bnq.com.cn',
		qiniuUrl:'http://xres.bnq.com.cn/file',//不支持https
	},
	test: {
		apiUrl: '//drm-test.bnq.com.cn',
		apiUrlFilter: '/drmAdmin',
		addressUrl: 'http://areas-test.bnq.com.cn/areas/area',
		authUrl: '//auth-test.bnq.com.cn',
		loginAddress: '//auth-test.bnq.com.cn/login/login.html',
		authUrlFilter: '/auth',
		exportUrl:'//drm-test.bnq.com.cn',
		qiniuUrl:'http://xres.bnq.com.cn/file',//不支持https
	},
	uat: {
		apiUrl: '//drm-uat.bnq.com.cn',
		apiUrlFilter: '/drmAdmin',
		addressUrl: 'http://areas-uat.bnq.com.cn/areas/area',
		authUrl: '//auth-uat.bnq.com.cn',
		loginAddress: '//auth-uat.bnq.com.cn/login/login.html',
		authUrlFilter: '/auth',
		exportUrl:'//drm-uat.bnq.com.cn',
		qiniuUrl:'http://xres.bnq.com.cn/file',//不支持https
	},
	production: {
		apiUrl: '//drm.bnq.com.cn',
		apiUrlFilter: '/drmAdmin',
		addressUrl: 'http://areas.bnq.com.cn/areas/area',
		authUrl: '//iauth.bnq.com.cn',
		loginAddress: '//iauth.bnq.com.cn/login/login.html',
		authUrlFilter: '/auth',
		exportUrl:'//drm.bnq.com.cn',
		qiniuUrl:'http://xres.bnq.com.cn/file',//不支持https
	}
}

module.exports = url;
