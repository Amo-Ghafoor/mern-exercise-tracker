import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Varzinesh</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">ورزش ها</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">ساخت برنامه ورزشی جدید</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">ایجاد کاربر</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}