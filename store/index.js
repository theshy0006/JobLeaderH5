import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
        token: "",
		phone: "",
        name: "",
        balanceBonus: "",
        totalBonus: "",
        id: 0,
        type: "",
	},
	mutations: {
		login(state, token) {
			state.token = token;
		},
        
        id(state, id) {
            state.id = id;
        },
        
        type(state, type) {
            state.type = type;
        },

		logout(state) {
			state.phone = "";
			state.token = "";
            state.name = "";
            state.balanceBonus = "";
            state.totalBonus = "";
            state.id = 0;
            state.type = "";
		},
        userInfo(state, phone, username, balanceBonus, totalBonus, id, type) {
            state.phone = phone;
            state.username = username;
            state.balanceBonus = balanceBonus;
            state.totalBonus = totalBonus;
            state.id = id;
            state.type = type;
        },
        setPhone(state, phone) {
            state.phone = phone
        },
        setName(state, name) {
            state.name = name
        },
        setBalanceBonus(state, balanceBonus) {
            state.balanceBonus = balanceBonus
        },
        setTotalBonus(state, totalBonus) {
            state.totalBonus = totalBonus
        },
        setId(state, id) {
            state.id = id
        },
        setType(state, type) {
            state.type = type
        },
	}
})

export default store
