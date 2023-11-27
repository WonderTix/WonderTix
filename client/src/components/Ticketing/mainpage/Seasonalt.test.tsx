import React from 'react';
import {unmountComponentAtNode} from 'react-dom';
import * as ReactDOM from 'react-dom';

import Seasonaltickets from './Seasonalt';

let container : HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(<Seasonaltickets/>, container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Seasonal Tickets Section renders with all text', () => {
  const check = container.querySelectorAll('div');
  expect(check).toHaveLength(9);
  expect(check[2].textContent).toBe('Anytime SubscriptionsStarting at$149' +
  'Redeem your Anytime Tickets for any performance dates – including our' +
  ' video on-demand options.3-4 Anytime TicketsSubscribe');
  expect(check[4].textContent).toBe('Sometimes SubscriptionsStarting at$111' +
  'Redeem your Sometimes Tickets for any Weds, Thurs, & Saturday Matinee' +
  ' performances.3-4 Sometimes TicketsSubscribe');
  expect(check[6].textContent).toBe('Preview SubscriptionsStarting at$69' +
  'These tickets can only be redeemed for preview performances (prior ' +
  'to Opening Night).3-4 Preview TicketsSubscribe');
  expect(check[8].textContent).toBe('More Details');
});
