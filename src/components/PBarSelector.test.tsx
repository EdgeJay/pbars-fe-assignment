import anyTest, { TestInterface } from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PBarSelector from './PBarSelector';
import { setupEnzyme, teardownEnzyme } from '../../tests/utils/enzyme';

const SAMPLE_PBARS = [
  { id: 'pBar_1', name: 'Progress Bar 1' },
  { id: 'pBar_2', name: 'Progress Bar 2' },
  { id: 'pBar_3', name: 'Progress Bar 3' },
  { id: 'pBar_4', name: 'Progress Bar 4' },
];

interface Context {
  pBars: typeof SAMPLE_PBARS;
}

const test = anyTest as TestInterface<Context>;

test.before((t) => {
  setupEnzyme();
  // eslint-disable-next-line no-param-reassign
  t.context.pBars = SAMPLE_PBARS;
});

test.after(() => {
  setTimeout(() => teardownEnzyme(), 200);
});

test('PBarSelector should set first option as selected', (t) => {
  const { pBars } = t.context;
  const wrapper = mount(<PBarSelector pBars={pBars} />);
  t.is(wrapper.find('select').at(0).props().value, 'pBar_1');
});

test('PBarSelector can render with empty pBars array', (t) => {
  const wrapper = mount(<PBarSelector pBars={[]} />);
  t.is(wrapper.find('select').at(0).props().value, '');
  t.is(wrapper.find('select option').length, 0);
});

test('PBarSelector should render select element with options', (t) => {
  const { pBars } = t.context;
  const wrapper = mount(<PBarSelector pBars={pBars} />);
  t.is(wrapper.find('option').length, 4);
});

test('PBarSelector should call function passed to "onSelection" prop with selection param', (t) => {
  const { pBars } = t.context;
  const spiedHandler = sinon.spy();
  const wrapper = mount(<PBarSelector pBars={pBars} onSelection={spiedHandler} />);
  wrapper
    .find('select')
    .at(0)
    .simulate('change', { target: { value: 'pBar_2' } });

  t.true(spiedHandler.calledWith({ id: 'pBar_2', name: 'Progress Bar 2' }));
  t.is(wrapper.find('select').at(0).props().value, 'pBar_2');
});
