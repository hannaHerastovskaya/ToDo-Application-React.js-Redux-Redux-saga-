import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import WebSocketContainer from './WebSocketContainer';
import DashboardListBasket from './scenes/basket/dashboardBasket/DashboardBasketContainer';
import Profile from './scenes/container/settings/profile/ProfileContainer';
import OneList from './scenes/list/OneListContainer';
import VisibleTodoList from './scenes/dashboard/DashboardContainer';
import Authorization from './scenes/account/authorization/AutorizationCortainer';
import Registration from './scenes/account/registration/RegistrationContainer';
import PageError404 from './scenes/errors/pageError404';
import PageError500 from './scenes/errors/pageError500';
import Container from './scenes/container/Container';

const App = () => (
    <WebSocketContainer>
        <Container>
            <Switch>
                <Route path="/lists/basket" component={DashboardListBasket} />
                <Route path="/lists/account" component={Profile} />
                <Route path="/lists/:id" component={OneList} />
                <Route path="/lists" component={VisibleTodoList} />
                <Route path="/auth" component={Authorization} />
                <Route path="/reg" component={Registration} />
                <Route path="/error404" component={PageError404} />
                <Route path="/error500" component={PageError500} />
                <Redirect to="/auth" />
            </Switch>
        </Container>
    </WebSocketContainer>
);

export default App;
