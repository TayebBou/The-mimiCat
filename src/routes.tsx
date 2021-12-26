import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ProgressSpinner } from 'primereact/progressspinner'
import PageNotFound from './components/error/PageNotFound/PageNotFound'

const Ranking = React.lazy(() => import('./containers/Ranking/Ranking'))
const Vote = React.lazy(() => import('./containers/Vote/Vote'))

const Routes = () => (
  <Suspense
    fallback={
      <div style={{ height: '100vh', width: '100%' }}>
        <ProgressSpinner />
      </div>
    }
  >
    <Switch>
      <Route path="/vote" component={Vote} exact />
      <Route path="/ranking" component={Ranking} exact />
      <Redirect from="/" to="/vote" exact />
      <Route render={() => <PageNotFound />} />
    </Switch>
  </Suspense>
)

export default Routes
