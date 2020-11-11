import middlewareRoute from "./middlewareRoute";

import Login from 'containers/Authen/Login';
import Register from 'containers/Authen/Register';
import Admin from 'containers/Admin';
import User from 'containers/User';
import Home from 'containers/Home';

const withRouter = middlewareRoute("/");

const indexRoutes = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/admin',
        name: 'Admin',
        component: withRouter(Admin, 'isAdmin')
    },
    {
        path: '/user',
        name: 'User',
        component: withRouter(User, 'isUser')
    },
    { path: '/', pathTo: '/home', name: 'Home', redirect: true }
];

export default indexRoutes;