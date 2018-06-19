import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../../components/Loading'
  
const LoadableComponent = Loadable({
    loader: () => import('./Analysis'),
    loading: Loading,
});

export default class Analysis extends React.Component {
    render() {
        return <LoadableComponent/>;
    }
}