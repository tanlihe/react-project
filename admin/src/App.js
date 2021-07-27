/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 12:40:53
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-30 01:52:24
 */
import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import layoutConfig from '@/router/layoutConfig';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="App"
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Router>
          <Switch>
            {layoutConfig.map(i => {
              return i.redirect ? (
                <Redirect key={i.path} {...i} />
              ) : (
                <Route key={i.path} {...i} />
              );
            })}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
