import React, { Component } from "react";
import axios from "axios";
import SuccessAlert from '../SuccessAlert';
import ErrorAlert from '../ErrorAlert';

export default class EditRoomType extends Component {

    state = {
        roomTypeName: '',
        alert_message: ''
    };

    componentDidMount() {
        axios
            .get("/api/room-types/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    roomTypeName: response.data.name,
                });
            })
    }

    onChangeRoomTypeName = e => this.setState({roomTypeName: e.target.value})

    onSubmit = e => {
        e.preventDefault();

        const editedRoomType = {
            roomTypeName: this.state.roomTypeName,
        };

        axios
            .put(
                "/api/room-types/" + this.props.match.params.id,
                editedRoomType
            )
            .then(res => {
                this.props.history.push("/room-types");
            })
    };

    submitValidation = () =>
        Boolean(this.state.roomTypeName);

    discardChanges = () => this.props.history.push("/room-type");

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 className="text-center">Update RoomType</h3>
                {this.state.alert_message == "success" ? <SuccessAlert message={"Room Type updated successfully."} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Error occurred while updating the Room Type."} /> : null}
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label>RoomType Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.roomTypeName}
                                onChange={this.onChangeRoomTypeName}
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!this.submitValidation()}
                            >
                                Update RoomType
                            </button>
                            <button
                                style={{ marginLeft: 20 }}
                                type="reset"
                                className="btn btn-secondary"
                                onClick={this.discardChanges}
                            >
                                Discard Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}