import React from 'react';
import Loader from 'react-loader-spinner';

export const MyLoader = (load = false) =>
  // return <div>loading...</div>;
  false ? (
    <div>
      <Loader
        type="TailSpin"
        color="#00BFFF"
        style={{
          // margin: '0px auto',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '0px',
          textAlign: 'center',
          paddingTop: '20%',
          zIndex: 2000,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)'
        }}
        height={100}
        width={100}
      />
    </div>
  ) : null;
