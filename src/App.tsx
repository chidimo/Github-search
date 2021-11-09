import { LoginWithGithub } from './login/LoginWithGithub';
import { Navbar } from './navbar/Navbar';
import { SearchResults } from './result/SearchResults';
import { SearchPage } from './search/SearchPage';

const isLoggedIn = true;

function App(): JSX.Element {
  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar />
          {/* <SearchPage /> */}
          <SearchResults />
        </>
      ) : (
        <LoginWithGithub />
      )}
    </>
  );
}

export default App;
