import {NAVSHOW} from '../constants/index';

const navOpen = (state = window.innerWidth >768 ? false : true, action = {}) => {
    // console.log(action)
    
    switch (action.type) {
        case NAVSHOW:
        return !state;
        default: return state
    }
}
export default navOpen