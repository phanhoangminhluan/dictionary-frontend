import Dictionary from '../page/dictionary';

const indexRoutes = [
    {
        path: '/home',
        name: 'Home',
        component: Dictionary
    },
    {
        path: '/dictionary',
        name: 'Dictionary',
        component: Dictionary
    }
];

export default indexRoutes;