import React, { useState, useEffect, ReactPropTypes } from 'react';
import './App.css';
import { LoginComponent } from './components/login.component';
import { Switch, Route } from 'react-router-dom';
import { DashboardComponent } from './components/dashboard.component';
import { ProtectedRoute } from './components/protected-route.component';
import { TodayComponent } from './components/today.component';
import { ApiService } from './services/api.service';
import moment from 'moment';
import spinner from './spinner.gif';

const apiService = new ApiService();

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [pages, setPages] = useState([]);
  const [today, setToday] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      apiService.getPages()
        .then(response => {
          setPages(response.data.pages);
          setToday(response.data.pages.find((p: any) => p.dated === moment().format('YYYY-MM-DD')));
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (today) {
      setIsLoading(false);
    }
  }, [today]);

  return (
    <div className="App">
      {
        !isLoading ?
          <Switch>
            <ProtectedRoute path="/" exact render={(props: any) => <DashboardComponent pages={pages} {...props} user={user} />} />
            <Route path="/login" exact render={(props: any) => <LoginComponent setIsLoading={setIsLoading} />} />
            <ProtectedRoute path="/:dated" render={(props: any) => <TodayComponent today={today} pages={pages} setIsLoading={setIsLoading} setPages={setPages} {...props} />} />
          </Switch> :
          <div className="Loader">
            <div className="spinner" />
          </div>
      }
    </div>
  );
}

export default App;
