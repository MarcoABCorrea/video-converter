import React from 'react';
import ReactDOM from 'react-dom';
import 'src/assets/stylesheets/base.scss';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import Home from "./containers/Home";
import Upload from "./containers/Upload";

ReactDOM.render(
    (<Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
            <Route path="upload" component={Upload} />
        </Route>
    </Router>), document.getElementById('root'));