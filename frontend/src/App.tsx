// Import react
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
// Import MUI
import {
  Paper,
  Stack,
} from '@mui/material';

// Import redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';

// Import routes
import routes from './routes';

// Import toast
import { ToastContainer, Slide } from 'react-toastify';

// Import components
import Loading from './components/Loading/Loading';

// Import firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { setToken } from './redux/slices/authSlice';

// Import styles
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'

const App = () => {
  const auth = getAuth();
  const dispatch = useDispatch()
  //----------------------------------------------------------------//
  //                          HOOKS                                 //
  //----------------------------------------------------------------//
  useEffect (() => {
    auth.currentUser?.getIdTokenResult().then((idTokenResult) => {
      dispatch(setToken(idTokenResult.token));
    })
  }, [auth]);
  const {data: isMatching} = useSelector((state: RootState) => state.isMatching);
  const [user, loading] = useAuthState(auth);

  //----------------------------------------------------------------//
  //                          RENDER                                //
  //----------------------------------------------------------------//
  if (loading) {
    return (
      <Paper sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Stack sx={{
          height: '100vh',
          justifyContent: 'center',
        }}>
          <Loading />
        </Stack>
      </Paper>
    );
  }

  const routing = useRoutes(routes(user != null, isMatching));
    return (
      <>
        {routing}
        <ToastContainer
          pauseOnFocusLoss={false}
          transition={Slide}
        />
      </>
    );
}

export default App;
