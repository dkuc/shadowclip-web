import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import MastHead from './components/masthead/Masthead';
import Home from './routes/Home';
import Clips from './routes/Clips'
import ClipsPlayer from './routes/ClipsPlayer';

import './App.scss';

const App = () => {

    return (
        <Fragment>
            <MastHead/>
            <Switch>
                <Route exact path='/' component={ Home }/>
                <Route exact path='/videos' component={ Clips }/>
                <Route path='/videos/:id' component={ ClipsPlayer }/>
            </Switch>
        </Fragment>
    );
}

export default App;