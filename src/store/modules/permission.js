import { asyncRoutes, constantRoutes } from '@/router';
import { setCache } from '@/utils/session';
import router, { resetRouter } from '@/router';


const state = {
  routers: []
};

const mutations = {
  SET_ROUTE(state, routers) {
    state.routers = constantRoutes.concat(routers);
  }
};

const actions = {
  getRoute({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { userRouters } = data;
      const { is_supper } = data;
      let accessedRoutes = [];
      asyncRoutes.forEach(aRoute => {
        if (is_supper === 1) return true;
        if (aRoute.name && aRoute.name === "root") {
          let arr = [];
          if (aRoute.children){
            aRoute.children.forEach(aitem => {
              userRouters.forEach(uitem => {
                if (aitem.name === 'Dashboard') {
                  arr.push(aitem)
                } else if (aitem.name === uitem.name && aitem.auth === uitem.auth) {
                  arr.push(aitem)
                }
              })
            })
          }
          aRoute.children = arr
          accessedRoutes.push(aRoute)
        } else {
          accessedRoutes.push(aRoute)
        }
        
      })
      commit('SET_ROUTE', accessedRoutes);
      resolve(accessedRoutes);
    });
  },
  async changeRole({ commit, dispatch }, role) {
    const token = role + '20201013';
    commit('user/SET_TOKEN', token, { root: true });
    setCache('TOKEN', token);
    await dispatch('user/getInfo', token, { root: true });
    resetRouter();
    const accessedRoutes = await dispatch('getRoute', role);
    router.addRoutes(accessedRoutes);
    await dispatch('tagsView/clearTag', null, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
