import { useContext, useEffect } from 'react';
import './App.scss';
import ContentContainer from './components/contentContainer/ContentContainer';
import WelcomePanel from './components/welcome/WelcomePanel';
import AuthContext from './store/auth-context';
import Profile from './components/profile/Profile';
import WebsitesContainer from './components/websites/WebsitesContainer';
import Login from './components/login/Login';

function App() {
  const authProviderCtx = useContext(AuthContext);
  const { openProfile, setOpenProfile, setWebsites } = authProviderCtx;

  if (authProviderCtx.isLoggedIn) {
    return (
      <div className="App">
        <Profile />
        {openProfile && (
          <div
            className="background"
            onClick={() => setOpenProfile(!openProfile)}
          />
        )}
        <WelcomePanel />
        <main>
          <ContentContainer />
          <WebsitesContainer />
        </main>
      </div>
    );
  } else {
    return <Login />;
  }
}

export default App;
