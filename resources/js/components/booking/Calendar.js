import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
const MyCalendar = props => (
    <div>
        <BigCalendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
        />
    </div>
)
export MyCalendar class Caleandar extends Component {

    constructor() {
        super();
        this.state = {
            bookings: [],
        }
    }

    componentDidMount() {
        axios.get('/api/bookings')
            .then(response => {
                this.setState({
                    bookings: response.data,
                });
            });
    }

    onDelete(bookingId) {
        axios.delete('/api/bookings/' + bookingId)
            .then(response => {

                let bookings = this.state.bookings;

                for (var i = 0; i < bookings.length; i++) {
                    if (bookings[i].id == bookingId) {
                        bookings.splice(i, 1);
                        this.setState({ bookings: bookings });
                    }
                }
                this.setState({ alert_message: "success" })
            }).catch(error => {
                this.setState({ alert_message: "error" });
            })

    }

    render() {
        return (
            <div>
                <h3 className="text-center">Booking List</h3>
                <div
                    id="createNewBooking"
                    style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                </div>
                <Link to={"/bookings/create"}>Create</Link>
                <Link to={"/bookings/calendar"}>Calendar</Link>
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                        <tr>
                        <th>Room Id</th>
                        <th>Date Start</th>
                        <th>Date End</th>
                        <th>Customer FullName</th>
                        <th>Customer Email</th>
                        <th>Total Nights</th>
                        <th>Total Price</th>
                        <th>User_id</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.bookings.map(booking => {
                            return(
                                <tr key={booking.id}>
                                    <td>{booking.room_id}</td>
                                    <td>{booking.date_start}</td>
                                    <td>{booking.date_end}</td>
                                    <td>{booking.customer_name}</td>
                                    <td>{booking.customer_email}</td>
                                    <td>{booking.total_nights}</td>
                                    <td>{booking.total_price}</td>
                                    <td>{booking.user_id}</td>
                                    <td>
                                        <Link
                                            to={`/bookings/edit/${booking.id}`}
                                            className="btn btn-primary"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={"#"}
                                            className="btn btn-danger"
                                            onClick={this.onDelete.bind(this, booking.id)}
                                        >
                                            Remove
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}