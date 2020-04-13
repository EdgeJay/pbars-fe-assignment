import React, { SyntheticEvent, FunctionComponent } from 'react';
import styled from 'styled-components';
import { EMPTY_FUNCTION } from '../utils/defaults';

const StyledButton = styled.button`
  border-radius: 0.25rem;
  background-color: #fff;
  font-size: 1rem;
  padding: 0.5rem 0;
  width: 3rem;
`;

interface Props {
  progressValue?: number;
  onClick?: (progressValue?: number) => void;
}

const Button: FunctionComponent<Props> = ({ progressValue = 0, onClick = EMPTY_FUNCTION }) => {
  const handleClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    onClick(progressValue);
  };
  return <StyledButton onClick={handleClick}>{progressValue}</StyledButton>;
};

export default Button;
