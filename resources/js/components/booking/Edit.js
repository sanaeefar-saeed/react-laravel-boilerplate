import React, {Component} from "react";
import axios from "axios";

export default class Editooking extends Component {

    state = {
        roomId: '',
        dateStart: '',
        dateEnd: '',
        customerName: '',
        customerEmail: '',
        totalNights: '',
        totalPrice: '',
        userId: ''
    };

    clearInputs = () => {
        this.setState({
            roomId: '',
            dateStart: '',
            dateEnd: '',
            customerName: '',
            customerEmail: '',
            totalNights: '',
            totalPrice: '',
            userId: ''
        });
    };

    componentDidMount() {
        axios
            .get("/api/bookings/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    customerEmail: response.data.customer_email,
                    customerName: response.data.customer_name,
                    dateEnd: response.data.date_end,
                    dateStart: response.data.date_start,
                    roomId: response.data.room_id,
                    totalNights: response.data.total_nights,
                    totalPrice: response.data.total_price,
                    userId: response.data.user_id,
                });
            })
    }

    onChangeRoomId = e => this.setState({roomId : e.target.value})
    onChangeDateStart = e => this.setState({dateStart : e.target.value})
    onChangeDateEnd = e => this.setState({dateEnd : e.target.value})
    onChangeCustomerName = e => this.setState({customerName : e.target.value})
    onChangeCustomerEmail = e => this.setState({customerEmail : e.target.value})
    onChangeTotalNights = e => this.setState({totalNights : e.target.value})
    onChangeTotalPrice = e => this.setState({totalPrice : e.target.value})
    onChangeUserId = e => this.setState({userId : e.target.value})

    onSubmit = e => {
        e.preventDefault();

        const editedBooking = {
            roomId: this.state.roomId,
            dateStart: this.state.dateStart,
            dateEnd: this.state.dateEnd,
            customerName: this.state.customerName,
            customerEmail: this.state.customerEmail,
            totalNights: this.state.totalNights,
            totalPrice: this.state.totalPrice,
            userId: this.state.userId
        };

        axios
            .put(
                "/api/bookings/" + this.props.match.params.id,
                editedBooking
            )
            .then(res => {
                this.props.history.push("/bookings");
            })
    };

    submitValidation = () => {
        return Boolean(this.state.roomId) &&
            Boolean(this.state.dateStart) && Boolean(this.state.dateEnd) &&
            Boolean(this.state.customerName) &&  Boolean(this.state.totalPrice) ;
    };

    render() {
        return (
             <div>
                <h3 className="text-center">Update Booking</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Room ID: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.roomId}
                                onChange={this.onChangeRoomId}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Date Start: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.dateStart}
                                onChange={this.onChangeDateStart}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Date End: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.dateEnd}
                                onChange={this.onChangeDateEnd}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Customer Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.customerName}
                                onChange={this.onChangeCustomerName}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Customer Email: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.customerEmail}
                                onChange={this.onChangeCustomerEmail}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Total Nights: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.totalNights}
                                onChange={this.onChangeTotalNights}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Total Price: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.totalPrice}
                                onChange={this.onChangeTotalPrice}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>User Id: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.userId}
                                onChange={this.onChangeUserId}
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!this.submitValidation()}
                            >
                                Save Booking
                            </button>
                            <button
                                style={{marginLeft: 20}}
                                type="reset"
                                className="btn btn-secondary"
                                onClick={this.clearInputs}
                            >
                                Reset Form
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
