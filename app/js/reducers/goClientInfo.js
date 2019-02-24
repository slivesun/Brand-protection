import {GOCLIENTINFO} from '../constants/index';

const goClient = (state = false, action = {}) => {
    switch (action.type) {
        case GOCLIENTINFO:
        return action.state;
        default: return state
    }
}
export default goClient