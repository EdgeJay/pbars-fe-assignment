import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM, DOMWindow } from 'jsdom';

export interface Global extends NodeJS.Global {
  document?: Document;
  window?: DOMWindow;
  navigator?: Navigator;
}

export const setupEnzyme = (): void => {
  Enzyme.configure({ adapter: new Adapter() });
  // setup browser env
  const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  (global as Global).document = window.document;
  (global as Global).window = window;
};

export const teardownEnzyme = (): void => {
  // reset browser env
  (global as Global).document = undefined;
  (global as Global).window = undefined;
};
