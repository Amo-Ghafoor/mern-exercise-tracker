import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';

export default class Landing extends Component {

  render() {
    return (
      <Redirect  to="/assets/index.html" replace={true}/>
    );
  }
}