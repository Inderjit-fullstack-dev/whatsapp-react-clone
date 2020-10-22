import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { useStateValue } from "./StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;