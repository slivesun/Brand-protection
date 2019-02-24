import { combineReducers } from "redux";
import collapsed from './navshow';
import dealer from './dealer';
import stateClient from './goClientInfo';


const rootReducer = combineReducers({
    collapsed,
    stateClient,
    dealer
});
export default rootReducer
