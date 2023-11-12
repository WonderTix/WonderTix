import {unmountComponentAtNode} from 'react-dom';
import React from 'react';
import * as ReactDOM from 'react-dom';

import Footer from './footer';

let container : HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(<Footer />, container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Footer section renders with all text', () => {
  const copyright = container.querySelector('p');
  const signUpMessage = container.querySelector('label');
  const subscribeButton = container.querySelector('button');
  expect(copyright.textContent).toBe('© 2023 Copyright: Portland Playhouse');
  expect(signUpMessage.textContent).toBe('Sign up for our newsletter');
  expect(subscribeButton.textContent).toBe('Subscribe');
});

it('Sign up input renders', () => {
  const input = container.querySelector('#newsletter-subscribe-email');
  expect(input).toBeInTheDocument();
});

it('Portland Playhouse link loads correctly', () => {
  const link = container.querySelector('a');
  expect(link).toHaveAttribute('href', 'https://portlandplayhouse.org/');
});
