import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PBarData } from '../types';
import { EMPTY_FUNCTION } from '../utils/defaults';

interface Props {
  pBars: PBarData[];
  onSelection?: (data: PBarData) => void;
}

const Select = styled.select`
  border: 1px solid #949494;
  border-radius: 0.25rem;
  background-color: #fff;
`;

const PBarSelector: FunctionComponent<Props> = ({ pBars, onSelection = EMPTY_FUNCTION }) => {
  const [selectedValue, setSelectedValue] = useState(pBars.length > 0 ? pBars[0].id : '');

  useEffect(() => {
    const data = pBars.find((item) => item.id === selectedValue);
    if (data) {
      onSelection(data);
    }
  }, []);

  const handleChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    const value = evt.target.value;
    const data = pBars.find((item) => item.id === value);
    if (data) {
      setSelectedValue(data.id);
      onSelection(data);
    }
  };

  return (
    <Select value={selectedValue} onChange={handleChange} aria-label="Choose progress bar">
      {pBars.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Select>
  );
};

export default PBarSelector;
