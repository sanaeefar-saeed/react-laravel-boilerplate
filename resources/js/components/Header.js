import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Home from './Home';
import Hotel from "./hotel";
import RoomType from "./roomType";
import Room from "./room";
import Booking from "./booking";
import PriceList from "./priceList";

export default class Header extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Setting
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/hotels">Hotels</Link>
                                        <Link className="dropdown-item" to="/room-types">RoomTypes</Link>
                                        <Link className="dropdown-item" to="/rooms">Rooms</Link>
                                        <Link className="dropdown-item" to="/price-lists">PriceList</Link>
                                        <Link className="dropdown-item" to="/bookings">Booking</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Route path={"/"} component={Home}/>
                    <Route path={"/hotels"} component={Hotel}/>
                    <Route path={"/room-types"} component={RoomType}/>
                    <Route path={"/rooms"} component={Room}/>
                    <Route path={"/price-lists"} component={PriceList}/>
                    <Route path={"/bookings"} component={Booking}/>
                </div>
            </Router>
        );
    }
}