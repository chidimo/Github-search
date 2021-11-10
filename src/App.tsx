import { useSelector } from 'react-redux';
import { LoginWithGithub } from './login/LoginWithGithub';
import { Navbar } from './navbar/Navbar';
import { SearchResults } from './result/SearchResults';
import { SearchPage } from './search/SearchPage';
import { selectLoginState } from './store/login';

function App(): JSX.Element {
  const userLoggedIn = useSelector(selectLoginState);
  return (
    <>
      {!userLoggedIn && <LoginWithGithub />}
      {userLoggedIn && (
        <>
          <Navbar />
          {/* <SearchPage /> */}
          <SearchResults />
        </>
      )}
    </>
  );
}

export default App;
