import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Index extends Component {

    constructor() {
        super();
        this.state = {
            hotels: [],
        }
    }

    componentDidMount() {
        axios.get('/api/hotels')
            .then(response => {
                this.setState({
                    hotels: response.data,
                });
            });
    }

    onDelete(hotelId) {
        axios.delete('/api/hotels/' + hotelId)
            .then(response => {

                let hotels = this.state.hotels;

                for (var i = 0; i < hotels.length; i++) {
                    if (hotels[i].id == hotelId) {
                        hotels.splice(i, 1);
                        this.setState({ hotels: hotels });
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
                    <h3 className="text-center">Hotel List</h3>
                    <div
                        id="createNewHotel"
                        style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                    </div>
                    <Link to={"/hotels/create"}>Create</Link>
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Zip Code</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.hotels.map(hotel => {
                                return(
                                    <tr key={hotel.id}>
                                        <td>{hotel.name}</td>
                                        <td>{hotel.address}</td>
                                        <td>{hotel.city}</td>
                                        <td>{hotel.state}</td>
                                        <td>{hotel.country}</td>
                                        <td>{hotel.zip_code}</td>
                                        <td>{hotel.phone_number}</td>
                                        <td>{hotel.email}</td>
                                        <td><img src={hotel.images} alt="not found" width={40} height={40} /></td>
                                        <td>
                                            <Link
                                                to={`/hotels/edit/${hotel.id}`}
                                                className="btn btn-primary"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={"#"}
                                                className="btn btn-danger"
                                                onClick={this.onDelete.bind(this, hotel.id)}
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