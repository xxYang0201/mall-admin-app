const roleToRoute = {
  coustomer: [{
    name: 'Product',
  },
  {
    name: 'ProductList',
  },
  {
    name: 'ProductAdd',
  },
  ],
  admin: [{
    name: 'Product',
  },
  {
    name: 'ProductList',
  },
  {
    name: 'ProductAdd',
  },
  {
    name: 'Category',
  },
  ],
};

// 根据角色筛选路由权限

export default function getMenuRoute(role, routes) {
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  const resltRoutes = routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resltRoutes;
}
