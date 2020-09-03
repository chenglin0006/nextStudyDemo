export default {
    state: {
        num:13,
        cityList: []
    },
    reducers: {
      add: (state, org) => {
        return {
            ...state,
            num: state.num + org
        }
      },
      setCityList: (state, org) => {
        return {
            ...state,
            cityList: org
        }
      },
    },
    effects: {
      async addNumAsync (payload, rootState) {
        // await new Promise(resolve => setTimeout(resolve, 2000))
        const res = await fetch('https://api.tvmaze.com/search/shows?q=marvel');
        const data = await res.json();
        this.add(data.length);
        return data;
      },
      async cityListAsync (payload, rootState) {
        let res = await fetch('http://web.futureshop.dev-zt.bnq.com.cn:3008/drmAdmin/serviceAreaConfig/cities');
        res = await res.json();
        const data = await res.result.data.cityList;
        this.setCityList(data);
        return data;
      },
    }
  }