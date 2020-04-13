import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BaseColours } from '../utils/colours';

interface ContainerProps {
  highlighted: boolean;
}

const Container = styled.div.attrs({ className: 'pbar' })<ContainerProps>`
  position: relative;
  width: 100%;
  height: 3rem;
  border: ${(props): string =>
    props.highlighted
      ? `2px solid ${BaseColours.PROGRESS_BAR_HIGHLIGHTED_BORDER}`
      : `1px solid ${BaseColours.PROGRESS_BAR_BORDER}`};
  background-color: ${BaseColours.PROGRESS_BAR_BG};

  @media (min-width: 480px) {
    width: 18.75rem;
  }
`;

const ProgressLabel = styled.p`
  position: absolute;
  z-index: 2;
  margin: 0;
  padding: 1rem 0 0 0;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  line-height: 1;
  text-align: center;
  box-sizing: border-box;
`;

interface ProgressLevelProps {
  width?: number;
}

const ProgressLevel = styled.span<ProgressLevelProps>`
  display: block;
  position: absolute;
  z-index: 1;
  width: ${(props): number => {
    if (props.width) {
      return props.width > 100 ? 100 : props.width;
    }
    return 0;
  }}%;
  height: 100%;
  background-color: ${(props): string => {
    if (props.width) {
      return props.width > 100 ? BaseColours.PROGRESS_BAR_RED : BaseColours.PROGRESS_BAR_BLUE;
    }
    return BaseColours.PROGRESS_BAR_BLUE;
  }};
`;

interface ProgressBarProps {
  progress?: number;
  limit?: number;
  highlighted?: boolean;
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  progress = 0,
  limit = 0,
  highlighted = false,
}) => {
  let currentValue = 0;
  let percent = 0;
  if (limit) {
    currentValue = progress;
    percent = Math.round((currentValue / limit) * 100);
  }
  return (
    <Container highlighted={highlighted}>
      <ProgressLevel width={percent} />
      <ProgressLabel>{`${percent}%`}</ProgressLabel>
    </Container>
  );
};

export default ProgressBar;
