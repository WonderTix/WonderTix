import {unmountComponentAtNode} from 'react-dom';
import React from 'react';
import * as ReactDOM from 'react-dom';

import Footer from './footer';

let container : HTMLDivElement;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(<Footer/>, container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Footer Section renders with all text', () => {
  const check = container.querySelectorAll('div');
  expect(check).toHaveLength(6);
  expect(check[2].textContent).toBe('Sign up for our newsletter');
  expect(check[4].textContent).toBe('Subscribe');
  expect(check[5].textContent).toBe('© 2022 Copyright:  Portland Playhouse');
});

it('Sign up input renders', () => {
  const input = container.querySelector('#exampleFormControlInput1');
  expect(input).toBeInTheDocument();
});

it('Portland Playhouse link loads correctly', () => {
  let link = document.createElement('a');
  link = container.querySelector('a');
  expect(link).toHaveAttribute('href', 'https://portlandplayhouse.org/');
});
