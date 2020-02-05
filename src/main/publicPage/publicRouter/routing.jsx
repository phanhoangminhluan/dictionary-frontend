import { store } from '../../../store';
import { listEventsReducer } from '../components/listEvent/listEvents.reducer.js';

import ListEvents from "../components/listEvent/listEvents.jsx";
import EventDetail from "../components/eventDetail/eventDetail.jsx";
import ListSupplyPosts from "../components/listSupplyPost/listSupplyPosts.jsx";

const LIST_EVENTS_STORE = "LIST_EVENTS_STORE";

const ThemeRoutes = [
  {
    path: '/event/:id',
    name: 'Event Detail',
    component: EventDetail,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: ListSupplyPosts,
  },
  {
    path: '/events',
    name: 'Events',
    component: ListEvents,
    preProcess: () => store.injectReducer(LIST_EVENTS_STORE, listEventsReducer)
    //inject reducer: thêm reducer cho trang cần dùng
    //1 page 1 reducer
  },
  { path: '/', pathTo: '/events', name: 'Events', redirect: true }
];

export default ThemeRoutes;
