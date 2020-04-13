import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import ProgressBar from './ProgressBar';
import { setupEnzyme, teardownEnzyme } from '../../tests/utils/enzyme';

test.before(() => {
  setupEnzyme();
});

test.after(() => {
  setTimeout(() => teardownEnzyme(), 200);
});

test('ProgressBar should display 0% if limit is 0', (t) => {
  const progress = 50;
  const limit = 0;
  const percent = 0;
  const wrapper = mount(<ProgressBar progress={progress} limit={limit} />);
  t.is(wrapper.find('span').at(0).prop('width'), percent);
  t.is(wrapper.find('p').at(0).text(), `${percent}%`);
});

test('ProgressBar should reflect progress changes', (t) => {
  const limit = 100;
  let progress = 45;
  let percent = Math.round((progress / limit) * 100);

  const wrapper = mount(<ProgressBar progress={progress} limit={limit} />);
  t.is(wrapper.find('span').at(0).prop('width'), percent);
  t.is(wrapper.find('p').at(0).text(), `${percent}%`);

  progress = 70;
  percent = Math.round((progress / limit) * 100);

  wrapper.setProps({ progress });
  t.is(wrapper.find('span').at(0).prop('width'), percent);
  t.is(wrapper.find('p').at(0).text(), `${percent}%`);
});

test('ProgressBar should reflect progress value that is overlimit', (t) => {
  const progress = 120;
  const limit = 100;
  const percent = Math.round((progress / limit) * 100);
  const wrapper = mount(<ProgressBar progress={progress} limit={limit} />);
  t.is(wrapper.find('span').at(0).prop('width'), percent);
  t.is(wrapper.find('p').at(0).text(), `${percent}%`);
});
