import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';

import { rootReducer } from '../store/rootReducer';

const customRender = (ui:JSX.Element, { store = createStore(rootReducer, {}) } = {}):any => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  store,
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
