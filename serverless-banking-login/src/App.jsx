import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import Welcome from './Welcome'; // You may keep this component if you want to reuse it
import '@aws-amplify/ui-react/styles.css'; // Don't forget to include this!

function App() {
  return (
    <Authenticator>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} /> {/* All content is now served from the root */}
        </Routes>
      </Router>
    </Authenticator>
  );
}

export default App;
