import { ReactLocation, ReactLocationProvider, Routes } from 'react-location';
import { useSelector } from 'react-redux';
import { LoginWithGithub } from './login/LoginWithGithub';
import { Navbar } from './navbar/Navbar';
import { SearchResults } from './result/SearchResults';
import { SearchPage } from './search/SearchPage';
import { selectLoginState } from './store/login';

function App(): JSX.Element {
  const reactLocation = new ReactLocation();
  const userLoggedIn = useSelector(selectLoginState);

  return (
    <ReactLocationProvider location={reactLocation}>
      {!userLoggedIn && <LoginWithGithub />}
      {userLoggedIn && (
        <>
          <Navbar />
          <Routes
            routes={[
              { path: '/', element: <SearchPage /> },
              { path: '/results', element: <SearchResults /> },
            ]}
          />
        </>
      )}
    </ReactLocationProvider>
  );
}

export default App;
