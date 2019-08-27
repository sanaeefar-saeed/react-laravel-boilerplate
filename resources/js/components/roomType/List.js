import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SuccessAlert from '../SuccessAlert';
import ErrorAlert from '../ErrorAlert';

export default class Index extends Component {

    constructor() {
        super();
        this.state = {
            roomTypes: [],
        }
    }

    componentDidMount() {
        axios.get('/api/room-types')
            .then(response => {
                this.setState({
                    roomTypes: response.data,
                });
            });
    }

    onDelete(roomTypeId) {
        axios.delete('/api/room-types/' + roomTypeId)
            .then(response => {

                let roomTypes = this.state.roomTypes;

                for (var i = 0; i < roomTypes.length; i++) {
                    if (roomTypes[i].id == roomTypeId) {
                        roomTypes.splice(i, 1);
                        this.setState({ roomTypes: roomTypes });
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
                    id="createNewRoomType"
                    style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                </div>
                <Link to={"/room-types/create"}>Create</Link>
                {this.state.alert_message == "success" ? <SuccessAlert message={"Room Type deleted successfully."} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Error occurred while deleting the Room Type."} /> : null}

                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Room Type Name</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.roomTypes.map(roomType => {
                                return(
                                    <tr key={roomType.id}>
                                        <td>{roomType.name}</td>
                                        <td>
                                            <Link
                                                to={`/room-types/edit/${roomType.id}`}
                                                className="btn btn-primary"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={"#"}
                                                className="btn btn-danger"
                                                onClick={this.onDelete.bind(this, roomType.id)}
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