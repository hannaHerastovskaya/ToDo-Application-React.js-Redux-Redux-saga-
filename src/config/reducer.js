import { combineReducers } from 'redux';
import { reducer as authReducer } from '../scenes/account/authorization/duck';
import { reducer as popupReducer } from '../scenes/popup/duck';
import { reducer as profileReducer } from '../scenes/container/settings/profile/duck';
import { reducer as followUserReducer } from '../scenes/container/settings/followUser/duck';
import { reducer as themeReducer } from '../scenes/container/settings/theme/duck';
import { reducer as dashboardReducer } from '../scenes/dashboard/duck';
// import { reducer as tagReducer } from '../scenes/dashboard/multiSelect/duck';
import { reducer as listReducer } from '../scenes/list/duck';
import { reducer as subscribeReducer } from '../scenes/container/settings/subscribes/duck';
import { reducer as basketReducer } from '../scenes/basket/dashboardBasket/duck';

const mainReducer = combineReducers({
    dashboard: dashboardReducer,
    list: listReducer,
    auth: authReducer,
    popup: popupReducer,
    profile: profileReducer,
    followUser: followUserReducer,
    theme: themeReducer,
    subscribe: subscribeReducer,
    // tags: tagReducer,
    basket: basketReducer,
});

export default mainReducer;
