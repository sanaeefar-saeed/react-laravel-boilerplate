import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";

export default class Index extends Component {
    render() {
        return (
                <div>
                    <Route exact path={"/bookings"} component={List}/>
                    <Route exact path={"/bookings/create"} component={Create}/>
                    <Route exact path={"/bookings/edit/:id"} component={Edit}/>
                </div>
        );
    }
}