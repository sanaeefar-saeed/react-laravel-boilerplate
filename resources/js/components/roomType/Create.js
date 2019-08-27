import React, {Component} from "react";
import axios from "axios";
import SuccessAlert from '../SuccessAlert';
import ErrorAlert from '../ErrorAlert';

export default class CreateRoomType extends Component {

    state = {
        roomTypeName: '',
        alert_message: ''
    };

    clearInputs = () => {
        this.setState({
            roomTypeName: '',
        });
    };

    onChangeRoomTypeName = e => this.setState({roomTypeName: e.target.value})

    onSubmit = e => {
        e.preventDefault();

        const newRoomType = {
            roomTypeName: this.state.roomTypeName,
        };

        axios
            .post("/api/room-types", newRoomType)
            .then(res => {
                this.clearInputs()
                this.setState({ alert_message: "success" })
            }).catch(error => {
                this.setState({ alert_message: "error" });
            })
    };

    submitValidation = () => {
        return Boolean(this.state.roomTypeName);
    };

    render() {
        return (
             <div>
                <h3 className="text-center">Add New RoomType</h3>
                {this.state.alert_message == "success" ? <SuccessAlert message={"Room Type added successfully."} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Error occurred while adding the Room Type."} /> : null}
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
                                Save RoomType
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
