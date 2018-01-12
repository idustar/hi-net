const menuData = [{
  name: 'Workspaces',
  icon: 'layout',
  path: 'workspaces',
}, {
  name: 'Workspace',
  path: 'workspace/:id',
  hideInMenu: true,
}, {
  name: 'Model',
  path: 'model/:id',
  hideInMenu: true,
}, {
  icon: 'team',
  name: 'Community',
  path: 'community',
}, {
    name: 'My Posts',
    path: 'posts',
  icon: 'profile',
}, {
  name: '异常页',
  icon: 'warning',
  hideInMenu: true,
  path: 'exception',
  children: [{
    name: '403',
    path: '403',
  }, {
    name: '404',
    path: '404',
  }, {
    name: '500',
    path: '500',
  }, {
    name: '触发异常',
    path: 'trigger',
  }],
}];

function formatter(data, parentPath = '') {
  return data.map((item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
