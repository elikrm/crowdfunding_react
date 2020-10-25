import React from "react";
import { BrowserRouter as Router, Switch, Route } from"react-router-dom";
import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/LoginPage";
import EditProjectPage from "./pages/EditProjectPage";
import "./App.css";
import NewProjectPage from "./pages/NewProject";
import Header from "./Header/Header";

function App() {
  return (
    <Router>
      <Route path="/">
        <Header />
      </Route>
    <div>
    <Nav />
      <Switch>

        <Route path="/delete-project/:id">
          <EditProjectPage />
        </Route>

        <Route path="/edit-project/:id">
          <EditProjectPage />
        </Route>

        <Route path="/project/:id">
          <ProjectPage />
        </Route>

        <Route path="/login">
        <LoginPage />
        </Route>  

        <Route path="/new-project">
          <NewProjectPage />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>

      </Switch>
    </div>
    </Router>
  );
  }
export default App;