import React from 'react';
import { Oval } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className="fb-loader-container">
      <Oval strokeWidth={4} color="rgb(167, 0, 0)" secondaryColor="rgb(106, 6, 6)" />
    </div>
  );
};
