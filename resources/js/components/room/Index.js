import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";

export default class Index extends Component {
    render() {
        return (
                <div>
                    <Route exact path={"/rooms"} component={List}/>
                    <Route exact path={"/rooms/create"} component={Create}/>
                    <Route exact path={"/rooms/edit/:id"} component={Edit}/>
                </div>
        );
    }
}