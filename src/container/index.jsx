import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { createHashHistory } from "history";

import indexRoutes from "../routes/index.js";

const hist = createHashHistory();

const App = props => (
    <Router basename="/" history={hist}>
        <Switch>
            {indexRoutes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key} />;
            })}
        </Switch>
    </Router>
);

export default App;