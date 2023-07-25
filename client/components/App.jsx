import React from 'react';
import MainContainer from './containers/MainContainer';

const App = () => {
  return(
    <div className="main">
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}