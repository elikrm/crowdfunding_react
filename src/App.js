import React from "react";
import { BrowserRouter as Router, Switch, Route } from"react-router-dom";
import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import EditProjectPage from "./pages/EditProjectPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";
import NewProjectPage from "./pages/NewProject";
import Header from "./Header/Header";

function App() {

  const convertDateTime = (isoDate) => {
    const date = new Date(isoDate)
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    if (day < 10) {
      day = "0" + day
    }
    if (month < 10) {
      month = "0" + month
    }
    const formattedDate = day + "-" + month + "-" + year
    return formattedDate
  }
  return (
    <Router>
      <Route path="/">
        <Header />
      </Route>
    <div>
    <Nav />
      <Switch>

        <Route path= "/Profile">
          <ProfilePage />
        </Route>

        <Route path="/delete-project/:id">
          <EditProjectPage />
        </Route>

        <Route path="/edit-project/:id" >
          <EditProjectPage convertDateTime={convertDateTime}/>
        </Route>

        <Route path="/project/:id" >
          <ProjectPage convertDateTime={convertDateTime}/>
        </Route>

        <Route path="/login">
        <LoginPage />
        </Route>  

        <Route path="/logout">
          <LogoutPage />
        </Route>

        <Route path="/new-project" >
          <NewProjectPage convertDateTime={convertDateTime}/>
        </Route>

        <Route path="/" >
          <HomePage convertDateTime={convertDateTime}/>
        </Route>

      </Switch>
    </div>
    </Router>
  );
  }
export default App;