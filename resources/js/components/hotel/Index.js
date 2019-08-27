import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";

export default class Index extends Component {
    render() {
        return (
                <div>
                    <Route exact path={"/hotels"} component={List}/>
                    <Route exact path={"/hotels/create"} component={Create}/>
                    <Route exact path={"/hotels/edit/:id"} component={Edit}/>
                </div>
        );
    }
}