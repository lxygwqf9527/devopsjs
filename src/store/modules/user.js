import { getCache, setCache, removeCache } from '@/utils/session';
import { login, logout, getCodeTest, getInfo } from "@/api/user";
import { resetRouter } from "@/router";
import md5 from "md5";

const getDefaultState = () => {
  return {
    token: getCache('TOKEN') || '',
    username: "",
    avatar: "",
    host_perms: "",
    nickname: "",
    is_supper: ""
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, username) => {
    state.username = username;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_HOST_PERMS: (state, host_perms) => {
    state.host_perms = host_perms;
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname;
  },
  SET_IS_SUPPER: (state, is_supper) => {
    state.is_supper = is_supper;
  }
};

const actions = {
  // login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: md5(password) })
        .then(response => {
          commit("SET_TOKEN", response.access_token);
          setCache('TOKEN', response.access_token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  codeTest({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      getCodeTest(userInfo)
        .then(res => {
          const { data } = res;
          if (data) {
            
            commit('SET_TOKEN', data.access_token);
            setCache('TOKEN', data.access_token);
          }
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          if (!response) {
            return reject("Verification failed, please Login again.");
          }
          const { username, avatar, host_perms, is_supper } = response;
          commit("SET_NAME", username);
          commit("SET_AVATAR", avatar);
          commit("SET_IS_SUPPER", is_supper);
          commit("SET_HOST_PERMS", host_perms);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          resetRouter();
          commit("RESET_STATE");
          removeCache('TOKEN');
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeCache('TOKEN'); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },

  // 前端登出
  fedLogOut({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeCache('TOKEN');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
