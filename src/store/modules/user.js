// import { login, logout, getInfo } from '@/api/login'
import { login, logout } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.from, userInfo.type)
          .then(response => {
            const data = response.data;
            console.log(data);
            // 无token 先记录username
            setToken(data.id);
            commit("SET_TOKEN", data.id);
            resolve();
          })
          .catch(error => {
            console.log(122);
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },
    // 前端 登录
    FedLogIn({ commit }, userInfo) {
      return new Promise(resolve => {
        const data = userInfo;
        setToken(data.username);
        commit("SET_TOKEN", data.username);
        resolve();
      });
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
