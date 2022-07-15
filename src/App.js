import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import HomeReducer from "./Redux/Reducers/HomeReducer";
import { createStore } from "redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react";
import { parse, stringify } from "flatted";

import Home from "./Components/Home";
import Users from "./Components/Users";
import Drivers from "./Components/Drivers";
import Requests from "./Components/Requests";

export const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState)
);

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  transforms: [transformCircular],
};

// const store = createStore(HomeReducer);
const persistedReducer = persistReducer(persistConfig, HomeReducer);
let store = createStore(persistedReducer);
let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users" exact component={Users} />
        <Route path="/drivers" exact component={Drivers} />
        <Route path="/requests" exact component={Requests} />
      </Switch>
    </Provider>
  );
}

export default App;
