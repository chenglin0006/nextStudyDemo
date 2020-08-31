export default {
    state: {
        num:13
    },
    reducers: {
      add: (state, org) => {
        return {
            ...state,
            num: state.num + org
        }
      }
    },
    effects: {
      async addNumAsync (payload, rootState) {
        // await new Promise(resolve => setTimeout(resolve, 200))
        const res = await fetch('https://api.tvmaze.com/search/shows?q=marvel');
        const data = await res.json();
        return this.add(data.length);
      }
    }
  }