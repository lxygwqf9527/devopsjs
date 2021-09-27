const getters = {
  // user
  token: state => state.user.token,
  username: state => state.user.username,
  nickname: state => state.user.nickname,

  // permission
  routers: state => state.permission.routers,


  // setting
  
};
export default getters;
