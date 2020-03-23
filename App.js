import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigation';
import placesReducer from './store/placesReducer';
import { init } from './helpers/db';

init()
  .then(() => {
    console.log('Initialized DB');
  })
  .catch(error => {
    console.log('Initializing DB failed');
    console.log(error);
  });

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
