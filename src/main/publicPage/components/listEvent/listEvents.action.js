import { get } from '../../../../utils/ApiCaller';
import { PUBLIC__LIST_EVENTS } from "../../../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../../../utils/LocalStorage";

const getListEventsRequest = () => ({ type: 'GET_LIST_EVENTS_REQUEST' });
const getListEventsSuccess = (payload) => ({ type: 'GET_LIST_EVENTS_SUCCESS', payload });
const getListEventsFail = (payload) => ({ type: 'GET_LIST_EVENTS_FAIL', payload });


export const getListEventsFromAPI = () => {
    return async (dispatch) => {
        dispatch(getListEventsRequest());
        await get(PUBLIC__LIST_EVENTS + "6",
			{},
			{ 'Authorization': 'Bearer ' + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT) }
        ).then(result => {
            dispatch(getListEventsSuccess(result.data));
        }).catch(err => {
            dispatch(getListEventsFail(err));
        });
    };
};