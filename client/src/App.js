import React, { useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import MainApp from './Main';
import socket from './socketClient';

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export default function App() {
  useEffect(() => {
    const listener = () => {
      console.log('connected');
    };

    socket.on('connected', listener);
    return () => {
      socket.off('connected', listener);
    };
  }, []);

  return (
    <AppContainer className="App">
      <MainApp />
    </AppContainer>
  );
}
