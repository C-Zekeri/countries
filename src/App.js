import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import CountryContext from "./Components/Context/countryContext";
import Home from './Components/Home/Homepage/homepage';
import DetailPage from './Components/Detail/detail';

function App() {
  const [countryn, setCountryn] = useState("");
  const [mode, SetMode] = useState("");

  return (
    <div className="App">
      <CountryContext.Provider value={{ countryName: [countryn, setCountryn], theme: [mode, SetMode] }}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/detail" component={DetailPage} />
          <Route component={Error} />
        </Switch>
      </CountryContext.Provider>
    </div>
  );
}

export default App;
