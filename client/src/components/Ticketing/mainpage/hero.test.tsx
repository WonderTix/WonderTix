import {unmountComponentAtNode} from 'react-dom';
import * as ReactDOM from 'react-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Hero from './hero';
import {ListComponent} from './eventcard';

let container : HTMLDivElement;
let list : HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  list = document.createElement('div');
  document.body.appendChild(container);
  document.body.appendChild(list);
  ReactDOM.render(<BrowserRouter>
    <Routes>
      <Route path="*" element= {<Hero/>}/>
    </Routes>
  </BrowserRouter>, container);
  ReactDOM.render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element= {<ListComponent text={''}/>}/>
        </Routes>
      </BrowserRouter>, list);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Hero Section renders with all text', () => {
  const check = container.querySelectorAll('div');
  expect(check).toHaveLength(14);
});


it('Add ticket success', () => {
  let button = document.createElement('button');
  button = container.querySelector('button');

  let check = container.querySelectorAll('div');
  expect(check).toHaveLength(14);

  userEvent.click(button);

  check = container.querySelectorAll('div');
  expect(check).toHaveLength(18);
});
