import { Authenticator } from '@aws-amplify/ui-react';
import Welcome from './Welcome';
import Header from './Header';
import '@aws-amplify/ui-react/styles.css';


function App() {
  return (
    <>
      <Header />
      <Authenticator>
        <Welcome />
      </Authenticator>
    </>
  );
}

export default App;
