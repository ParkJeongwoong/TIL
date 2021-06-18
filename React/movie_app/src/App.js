import React from "react"
import { HashRouter, Route } from "react-router-dom"
import Home from "./routes/Home"
import About from "./routes/About"
import Detail from "./routes/Detail"
import Navigation from "./components/Navigation"

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home}></Route>
      <Route path="/about" exact={true} component={About}></Route>
      <Route path="/movie/:id" exact={true} component={Detail}></Route>
    </HashRouter>
  )
}

export default App