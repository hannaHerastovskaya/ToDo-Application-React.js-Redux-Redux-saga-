import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import mainReducer from './reducer';
import { saga as followSaga } from '../scenes/container/settings/followUser/duck';
import { saga as listSaga } from '../scenes/list/duck';
import { saga as popupSaga } from '../scenes/popup/duck';
import { saga as basketSaga } from '../scenes/basket/dashboardBasket/duck';
import { loginPageSaga } from '../scenes/account/duck';
import { saga as profileSaga } from '../scenes/container/settings/profile/duck';
import { saga } from '../scenes/dashboard/duck';
import { saga as subscribeSaga } from '../scenes/container/settings/subscribes/duck';
import { saga as tagSaga } from '../scenes/dashboard/multiSelect/duck';

const persistConfig = {
    key: 'app',
    whitelist: ['auth', 'theme'],
    storage,
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([
        saga(),
        listSaga(),
        loginPageSaga(),
        popupSaga(),
        followSaga(),
        profileSaga(),
        subscribeSaga(),
        // tagSaga(),
        basketSaga(),
    ]);
}

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
