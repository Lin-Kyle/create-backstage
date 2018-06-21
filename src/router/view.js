import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Analysis} from 'PAGE/Dashboard/LoadableComponent'
import NoMatch from 'CMPT/NoMatch'

export default() => {
    return <Switch>
        <Route path='/dashboard/analysis' component={Analysis}/>
        <Route component={NoMatch} />
    </Switch>
}
