import Statistic from "../statistic/statistic";

const PATH = "/admin";

const indexRoutes = [
  {
    path: `${PATH}/dashboard`,
    name: "Dashboard",
    component: Statistic,
  },
  {
    path: `${PATH}/`,
    name: "Dashboard",
    component: Statistic,
  },
  {
    path: "/",
    pathTo: `${PATH}/dashboard`,
    name: "Dashboard",
    redirect: true,
  },
];

export default indexRoutes;
