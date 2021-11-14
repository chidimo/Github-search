import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { graphqlMocks } from './graphqlMocks';
import { store as reduxStore } from '../store/store';

const customRender = (ui: JSX.Element, { store = reduxStore } = {}): any => ({
  ...render(
    <MockedProvider mocks={graphqlMocks}>
      <Provider store={store}>{ui}</Provider>
    </MockedProvider>
  ),
  store,
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
