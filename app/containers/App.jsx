import React, { PropTypes } from 'react';
import '../css/reset.css';


const App = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
