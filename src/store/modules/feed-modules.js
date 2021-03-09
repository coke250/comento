import axios from "axios";

const baseURL = "https://problem.comento.kr";
let isRequest = false; 

const state = {
    pages: [],
    page: 1,
    ord: "asc",
    category: [],
    limit: 10,
    nextPageUrl: null,
    feeds: [],
    ads: [],
    adPage: 1,
    detail: {},
};

const getters = {
    page: (state) => state.page,
    nextPageUrl: (state) => state.nextPageUrl,
    category: (state) => state.category,
    pages: (state) => state.pages,
    feeds: (state) => {
        const ids = state.category.filter(cat => cat.checked).map(cat => cat.id);
        return state.feeds.filter(feed => ids.includes(feed.category_id));
    },
    getCategoryNameById: (state) => (id) => state.category.filter(cat => cat.id === id)[0].name,
    ads: (state) => state.ads,
    detail: (state) => state.detail,
};

const actions = {
    async fetchPages({ commit, state }) {
        if(isRequest) return;
        isRequest = true;

        axios.get(`${baseURL}/api/category`)
            .then((response) => {
                commit("setCategory", response.data);
            
                return axios.get(`${baseURL}/api/ads`,{
                    params: {
                        page: state.adPage,
                        limit: state.limit,
                    }
                });
            })
            .then((response) => {
                commit("setAds", response.data);
                
                const categoryIds = state.category.map(cat => cat.id);
                return axios.get(`${baseURL}/api/list`,{
                    params: {
                        page: state.page,
                        ord: "asc",
                        category: categoryIds,
                        limit: state.limit,
                    },
                });
            })
            .then((response) => {
                commit("setPages", response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(()=>{
                isRequest = false;
            })
    },
    async addPages({commit, state}){
        if(isRequest) return;
        isRequest = true;

        axios.get(`${baseURL}/api/ads`,{
            params: {
                page: state.adPage,
                limit: state.limit,
            }
        })
        .then((response) => {
            commit("addAds", response.data);

            const categoryIds = state.category.map(cat => cat.id);
            return axios.get(`${baseURL}/api/list`, {
                params: {
                    page: state.page,
                    ord: "asc",
                    category: categoryIds,
                    limit: state.limit,
                },
            });
        })
        .then((response) => {
            commit("addPages", response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(()=>{
            isRequest = false;
        });
    },
    setOrder({commit}, ord){
        commit('setOrder', ord);
    },
    updateCategory({commit}, checkedIds){
        commit('updateCategory', checkedIds);
    },
    async fetchDetail({commit}, id){
        axios.get(`${baseURL}/api/view`,{
            params: {
                id: id,
            }
        })
        .then((response) => {
            commit("setDetail", response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(()=>{
            isRequest = false;
        });
    }
};

const mutations = {
    setCategory: (state, payload) => {
        state.category = payload.category.map(cat => {
            return {
                ...cat,
                checked: true,
            }
        });
    },
    setPages: (state, payload) => {
        state.page += 1;
        state.pages.push(payload);
        state.nextPageUrl = payload.next_page_url;
        payload.data.forEach(item => state.feeds.push(item));
    },
    addPages: (state, payload) => {
        state.page += 1;
        state.pages.push(payload);
        state.nextPageUrl = payload.next_page_url;
        payload.data.forEach(item => state.feeds.push(item));
    },
    setAds: (state, payload) => {
        state.adPage += 1;
        payload.data.forEach(item => state.ads.push(item));
    },
    addAds: (state, payload) => {
        state.adPage += 1;
        payload.data.forEach(item => state.ads.push(item));
    },
    setOrder: (state, payload) => {
        state.ord = payload;
        state.ord === "asc" ? state.feeds.sort((a, b) => a.id - b.id) : state.feeds.sort((a, b) => b.id - a.id);
    },
    setDetail: (state, payload) => {
        state.detail = payload.data;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};
