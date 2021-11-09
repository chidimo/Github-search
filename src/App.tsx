import { LoginWithGithub } from './login/LoginWithGithub';
import { Navbar } from './navbar/Navbar';
import { SearchPage } from './search/SearchPage';

const isLoggedIn = true;

function App(): JSX.Element {
  return (
    <>
      {isLoggedIn ?
        <>
        <Navbar />
        <SearchPage /></>
        :
        <LoginWithGithub />
      }
    </>
  );
}

export default App;
