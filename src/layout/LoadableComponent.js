import Loadable from 'react-loadable';
import LoadableLoading from 'CMPT/LoadableLoading';

const  Login = Loadable({
    loader: () =>  import('PAGE/login/Login'),
    loading: LoadableLoading,
    delay: 300
})


export {Login}
