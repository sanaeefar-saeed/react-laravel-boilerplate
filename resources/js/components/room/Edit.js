import React, { Component } from "react";
import axios from "axios";
import ImageUploader from "react-images-upload";
import SuccessAlert from '../SuccessAlert';
import ErrorAlert from '../ErrorAlert';

export default class EditRoom extends Component {

    state = {
        roomName: '',
        hotelId: '',
        roomTypeId: '',
        images: [],
        roomTypes: [],
        hotels:[],
        alert_message: ''
    };

    componentDidMount() {
        axios
            .get("/api/rooms/" + this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    roomName: response.data.name,
                    hotelId: response.data.hotel_id,
                    roomTypeId: response.data.room_type_id,
                    images: response.data.images
                });
            })

        axios.get('/api/room-types')
            .then(response => {
                this.setState({
                    roomTypes: response.data,
                });
            });

        axios.get('/api/hotels')
            .then(response => {
                this.setState({
                    hotels: response.data,
                });
            });

    }

    onChangeRoomName = e => this.setState({roomName: e.target.value})
    onChangeHotelId = e => {
        this.setState({hotelId: e.target.value})
        axios.get('/api/room-types')
            .then(response => {
                this.setState({
                    roomTypes: response.data,
                });
            });
    }

    onChangeRoomTypeId = e => this.setState({roomTypeId: e.target.value})


    onDropImage = files => {
        const length = files.length;
        // don't use map function instead of for lop here
        for (let i = 0; i < length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = e => this.setState(prevState => ({
                images: [...prevState.images, e.target.result]
            }));
        }
    };

    removeImage = (imageUrl) => {
        const newImages = this.state.images.filter(image => image !== imageUrl.image);
        this.setState({images: newImages})
    };

    onSubmit = e => {
        e.preventDefault();

        const editedRoom = {
            roomName: this.state.roomName,
            hotelId: this.state.hotelId,
            roomTypeId: this.state.roomTypeId,
            images: this.state.images,
        };

        axios
            .put(
                "/api/rooms/" + this.props.match.params.id,
                editedRoom
            )
            .then(res => {
                this.props.history.push("/rooms");
            })
    };

    submitValidation = () =>
        Boolean(this.state.roomName) && Boolean(this.state.hotelId) && Boolean(this.state.roomTypeId) && Boolean(this.state.roomTypeId);

    discardChanges = () => this.props.history.push("/rooms");

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 className="text-center">Update Room</h3>
                {this.state.alert_message == "success" ? <SuccessAlert message={"Room updated successfully."} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Error occurred while updating the Room."} /> : null}
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Room Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.roomName}
                                onChange={this.onChangeRoomName}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Hotel: </label>
                            <select
                                className="form-control"
                                value={this.state.hotelId}
                                onChange={this.onChangeHotelId}
                            >
                                <option value="">--Choose Hotel--</option>
                                {this.state.hotels.map(hotel => (
                                        <option key={hotel.id} value={hotel.id}>
                                            {hotel.name}
                                        </option>
                                    )
                                )
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Room Type: </label>
                            <select
                                className="form-control"
                                value={this.state.roomTypeId}
                                onChange={this.onChangeRoomTypeId}
                            >
                                <option value="">--Choose Room Type--</option>
                                {this.state.roomTypes.map(roomType => (
                                        <option key={roomType.id} value={roomType.id}>
                                            {roomType.name}
                                        </option>
                                    )
                                )
                                }
                            </select>                        </div>
                        <div id="imageSection" className="col-md-12">
                            <div className="form-group">
                                <label>Room Images</label>
                                <ImageUploader
                                    fileContainerStyle={{ backgroundColor: "#e6ecf7" }}
                                    withIcon={true}
                                    buttonText="Choose image"
                                    onChange={this.onDropImage}
                                    imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                    maxFileSize={5242880}
                                />
                            </div>
                            <div
                                id="showImages"
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    marginTop: 20,
                                    marginBottom: 20
                                }}
                            >
                                <img
                                    key={this.state.images}
                                    src={this.state.images}
                                    alt={"not found"}
                                    width={100}
                                    height={100}
                                    style={{ marginRight: 20 }}
                                    onClick={() => this.setState({ images: []})}
                                />
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!this.submitValidation()}
                            >
                                Update Room
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