import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { rootReducer } from '../store/rootReducer';
import { graphqlMocks } from './graphqlMocks';

const customRender = (
  ui: JSX.Element,
  { store = createStore(rootReducer, {}) } = {}
): any => ({
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
