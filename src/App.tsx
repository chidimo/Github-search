import { LoginWithGithub } from './login/LoginWithGithub';
import { SearchPage } from './search/SearchPage';

const isLoggedIn = true;

function App(): JSX.Element {
  return (
    <>
      {isLoggedIn ?
        <SearchPage />
        :
        <LoginWithGithub />
      }
    </>
  );
}

export default App;
