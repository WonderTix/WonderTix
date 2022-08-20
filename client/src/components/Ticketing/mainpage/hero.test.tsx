import {unmountComponentAtNode} from 'react-dom';
import * as ReactDOM from 'react-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import Hero from './hero';
import {ListComponent} from './eventcard';
import thunk from 'redux-thunk';

let container : HTMLDivElement;
let list : HTMLDivElement;

const mockStore = configureStore([thunk]);

const event = {
  eventname: 'test',
  title: 'test',
  description: 'test',
  imageUrl: 'https://test.com/image.jpg',
  id: 0,
  instances: [],
};

let store: any;

beforeEach(() => {
  store = mockStore(
      {
        ticketing: {
          events: [
          ],
        },
      },
  );
  console.log(store);
  container = document.createElement('div');
  list = document.createElement('div');
  document.body.appendChild(container);
  document.body.appendChild(list);
  ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="*" element= {<Hero/>}/>
      </Routes>
    </Provider>
  </BrowserRouter>, container);
  ReactDOM.render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element= {<ListComponent {...event}/>}/>
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
  expect(check).toHaveLength(9);
});


it('Add ticket success', () => {
  let button = document.createElement('button');
  button = list.querySelector('button');

  let check = list.querySelectorAll('div');
  expect(check).toHaveLength(4);

  userEvent.click(button);

  check = container.querySelectorAll('div');
  expect(check).toHaveLength(9);
});
