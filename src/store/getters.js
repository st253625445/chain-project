const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  chainId: state => state.app.chainId
};
export default getters;
