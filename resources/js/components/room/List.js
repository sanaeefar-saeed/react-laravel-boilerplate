import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Index extends Component {

    constructor() {
        super();
        this.state = {
            rooms: [],
        }
    }

    componentDidMount() {
        axios.get('/api/rooms')
            .then(response => {
                this.setState({
                    rooms: response.data,
                });
            });
    }

    onDelete(roomId) {
        axios.delete('/api/rooms/' + roomId)
            .then(response => {

                let rooms = this.state.rooms;

                for (var i = 0; i < rooms.length; i++) {
                    if (rooms[i].id == roomId) {
                        rooms.splice(i, 1);
                        this.setState({ rooms: rooms });
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
                <h3 className="text-center">Room Type List</h3>
                <div
                    id="createNewRoom"
                    style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                </div>
                <Link to={"/rooms/create"}>Create</Link>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Room Name</th>
                        <th>Hotel Name</th>
                        <th>Room Type</th>
                        <th>Room Image</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.rooms.map(room => {
                            return(
                                <tr key={room.id}>
                                    <td>{room.name}</td>
                                    <td>{room.hotel_id}</td>
                                    <td>{room.room_type_id}</td>
                                    <td><img src={room.images} alt="not found" width={40} height={40} /></td>
                                    <td>
                                        <Link
                                            to={`/rooms/edit/${room.id}`}
                                            className="btn btn-primary"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={"#"}
                                            className="btn btn-danger"
                                            onClick={this.onDelete.bind(this, room.id)}
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