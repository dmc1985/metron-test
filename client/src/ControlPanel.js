import { Button, TextInput } from 'evergreen-ui';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Container, RowContainer } from './styledComponents';
import socket from './socketClient';

const StyledTextInput = styled(TextInput)`
  margin: 0 20px;
`;

const StyledButton = styled(Button)`
  margin: 0 20px;
`;

function ControlPanel({
  firstFilter,
  secondFilter,
  setFirstFilter,
  setSecondFilter,
  setAllTweets,
}) {
  return (
    <Container>
      <RowContainer>
        <StyledTextInput
          id="first"
          placeholder="First"
          value={firstFilter}
          onChange={(e) => setFirstFilter(e.target.value)}
        />
        <StyledTextInput
          id="second"
          placeholder="Second"
          value={secondFilter}
          onChange={(e) => setSecondFilter(e.target.value)}
        />
      </RowContainer>
      <RowContainer>
        <StyledButton
          appearance="primary"
          intent="success"
          onClick={() => {
            socket.emit('tweet-request', { filters: [firstFilter, secondFilter] });
          }}
          disabled={!firstFilter || !secondFilter}
        >
          Go
        </StyledButton>
        <StyledButton
          intent="danger"
          onClick={() => {
            socket.emit('stop');
            setAllTweets([]);
          }}
        >
          Reset
        </StyledButton>
      </RowContainer>
    </Container>
  );
}

ControlPanel.propTypes = {
  firstFilter: PropTypes.string.isRequired,
  secondFilter: PropTypes.string.isRequired,
  setFirstFilter: PropTypes.func.isRequired,
  setSecondFilter: PropTypes.func.isRequired,
  setAllTweets: PropTypes.func.isRequired,
};

export default ControlPanel;
