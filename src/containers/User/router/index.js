import CreateCard from '../page/CreateCard';
import ListMyCardSet from '../page/ListMyCartSet';
import UpdateCard from '../page/UpdateCard';
import FlashCard from '../page/FlashCard';

const PATH = '/user';

const indexRoutes = [
    {
        path: `${PATH}/flash-card/:id`,
        name: 'FlashCard',
        component: FlashCard
    },
    {
        path: `${PATH}/create-card`,
        name: 'Create Card',
        component: CreateCard
    }, 
    {
        path: `${PATH}/list-my-cardset`,
        name: 'List My Cardset',
        component: ListMyCardSet
    },
    {
        path: `${PATH}/cardset/:id`,
        name: 'My Cardset',
        component: UpdateCard
    },{
        path: '/', pathTo: `${PATH}/list-my-cardset`, name: 'List My Cardset', redirect: true 
    }
];

export default indexRoutes;