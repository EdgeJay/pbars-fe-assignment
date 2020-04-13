import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import fetchPonyfill from 'fetch-ponyfill';
import { PBarData, PBarResponse } from '../types';
import ProgressBar from './ProgressBar';
import PBarSelector from './PBarSelector';
import Button from './Button';

const { fetch } = fetchPonyfill();

const Container = styled.div`
  flex: 1;
  height: 100%;
`;

const PBarsContainer = styled.div`
  margin-bottom: 1rem;

  .pbar + .pbar {
    margin-top: 0.5rem;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 1rem;

  button + button {
    margin-left: 0.5rem;
  }
`;

const PROGRESS_BAR_PREFIX = 'pBar_';
const PROGRESS_BAR_NAME_PREFIX = 'Progress Bar ';
const BUTTON_PREFIX = 'button_';

const PBDemo: FunctionComponent = () => {
  const [pBars, setPBars] = useState<PBarData[]>([]);
  const [limit, setLimit] = useState(0);
  const [buttonValues, setButtonValues] = useState<number[]>([]);
  const [selectedPBarData, setSelectedPBarData] = useState<PBarData | null>(null);

  const fetchData = async (): Promise<void> => {
    const response = await fetch('https://pb-api.herokuapp.com/bars');
    const result = (await response.json()) as PBarResponse;

    // convert response into list of PBarData
    let index = 0;
    const arr: PBarData[] = result.bars.map((bar) => {
      index += 1;
      return {
        id: `${PROGRESS_BAR_PREFIX}${index}`,
        name: `${PROGRESS_BAR_NAME_PREFIX}${index}`,
        progress: bar,
      };
    });

    if (arr.length > 0) {
      setSelectedPBarData(arr[0]);
    }
    setPBars(arr);
    setLimit(result.limit);
    setButtonValues(result.buttons);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const alterProgressBarValue = (buttonValue?: number): void => {
    if (buttonValue && selectedPBarData) {
      const newArr = pBars.map((bar) => {
        if (bar.id === selectedPBarData.id) {
          let { progress } = bar;
          if (!progress) {
            progress = buttonValue;
          } else {
            progress += buttonValue;
          }

          return {
            ...bar,
            progress,
          };
        }
        return bar;
      });
      setPBars(newArr);
    }
  };

  const handleSelection = (data: PBarData): void => {
    setSelectedPBarData(data);
  };

  const handleButtonClick = (buttonValue?: number): void => {
    alterProgressBarValue(buttonValue);
  };

  let buttonIndex = 0;

  return (
    <Container>
      <PBarsContainer>
        {pBars.map((item) => (
          <ProgressBar
            key={item.id}
            progress={item.progress}
            limit={limit}
            highlighted={selectedPBarData?.id === item.id}
          />
        ))}
      </PBarsContainer>
      <PBarSelector pBars={pBars} onSelection={handleSelection} />
      <ButtonsRow>
        {buttonValues.map((item) => {
          buttonIndex += 1;
          return (
            <Button
              key={`${BUTTON_PREFIX}${buttonIndex}`}
              progressValue={item}
              onClick={handleButtonClick}
            />
          );
        })}
      </ButtonsRow>
    </Container>
  );
};

export default PBDemo;
