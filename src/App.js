import './App.css';
import React from 'react'
import { Shop, Nav, About, ItemDescription } from "./components";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
          {/* Switch reads the first correct route and renders that. Skips the rest. */}
          <Route path="/" exact component={Home}/> 
          {/* exact specifies that the route must be the exact one that's written down for it to render the component. */}
          <Route path="/about" component={About}/>
          <Route path="/shop" exact component={Shop} />
          <Route path="/shop/:id" component={ItemDescription}/>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Fortnite Items</h1>
  </div>
)

export default App;
