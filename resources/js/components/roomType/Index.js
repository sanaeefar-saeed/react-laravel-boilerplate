import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";

export default class Index extends Component {
    render() {
        return (
                <div>
                    <Route exact path={"/room-types"} component={List}/>
                    <Route exact path={"/room-types/create"} component={Create}/>
                    <Route exact path={"/room-types/edit/:id"} component={Edit}/>
                </div>
        );
    }
}