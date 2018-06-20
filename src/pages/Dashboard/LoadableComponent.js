import React from 'react';
import Loadable from 'react-loadable';
import LoadableLoading from 'CMPT/LoadableLoading';

const LoadableComponent = Loadable({
    loader: () => import('PAGE/Dashboard/Analysis'),
    loading: LoadableLoading,
});

class Analysis extends React.Component {
    render() {
        return <LoadableComponent/>;
    }
}

export {Analysis} 
