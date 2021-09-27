// 创建单个路由
export function makeRoute(path, name, component, meta, auth) {
  return { path, name, component, meta, auth };
}

// 创建模块路由
export function makeModuleRoute(path, name, component, redirect, children) {
  return { path, name, component, redirect, children };
}
