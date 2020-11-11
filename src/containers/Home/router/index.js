import Dictionary from '../page/dictionary';
import Home from '../page/home';

const indexRoutes = [
    {
        path: '/home/main',
        name: 'Home',
        component: Home
    },
    {
        path: '/home/dictionary',
        name: 'Dictionary',
        component: Dictionary
    },{
        path: '/', pathTo: '/home/main', name: 'Home', redirect: true 
    }
];

export default indexRoutes;