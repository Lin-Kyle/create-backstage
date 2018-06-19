import React from 'react'
import {Switch, HashRouter, Route} from 'react-router-dom'
import Analysis from 'PAGE/Dashboard/LoadableComponent'

export default () => {
    return <Switch>
        <Route path='/dashboard/analysis' component={Analysis}/>
    </Switch>
}
