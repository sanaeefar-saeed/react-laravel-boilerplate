import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";

export default class Index extends Component {
    render() {
        return (
                <div>
                    <Route exact path={"/price-lists"} component={List}/>
                    <Route exact path={"/price-lists/create"} component={Create}/>
                    <Route exact path={"/price-lists/edit/:id"} component={Edit}/>
                </div>
        );
    }
}