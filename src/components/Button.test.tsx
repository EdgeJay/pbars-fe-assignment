import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Button from './Button';
import { setupEnzyme, teardownEnzyme } from '../../tests/utils/enzyme';

test.before(() => {
  setupEnzyme();
});

test.after(() => {
  setTimeout(() => teardownEnzyme(), 200);
});

test('Button should display progress value assigned to it', (t) => {
  const progressValue = 52;
  const wrapper = shallow(<Button progressValue={progressValue} />);
  t.is(wrapper.text(), `${progressValue}`);
});

test('Button should pass progress value as argument to onClick callback function', (t) => {
  let progressValue = 43;
  const preventDefault = sinon.stub();
  const spiedHandler = sinon.spy();
  const wrapper = shallow(<Button progressValue={progressValue} onClick={spiedHandler} />);
  wrapper.simulate('click', { preventDefault });
  t.true(spiedHandler.calledWith(progressValue));

  // latest progress value set should be passed to callback function
  progressValue = -20;
  wrapper.setProps({
    progressValue,
  });
  wrapper.simulate('click', { preventDefault });
  t.true(spiedHandler.calledWith(progressValue));
});
