/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-22 00:40:57
 * @LastEditors: Tang
 * @LastEditTime: 2021-06-23 00:57:47
 */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

function CreateRoutes(data = []) {
  return (
    <Switch>
      {data.map(i => {
        const { component: Component, ...lastProps } = i;
        return i.redirect ? (
          <Redirect key={lastProps.path} {...lastProps} />
        ) : (
          <Route
            key={lastProps.path}
            {...lastProps}
            render={props => {
              return (
                <div className="w-100-pc h-100-pc route-animation">
                  <Component {...props} />
                </div>
              );
            }}
          />
        );
      })}
    </Switch>
  );
}

export default CreateRoutes;
