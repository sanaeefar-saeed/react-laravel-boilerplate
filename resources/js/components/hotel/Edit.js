import React, { Component } from "react";
import axios from "axios";
import ImageUploader from "react-images-upload";
import SuccessAlert from '../SuccessAlert';
import ErrorAlert from '../ErrorAlert';

export default class EditHotel extends Component {

    state = {
        hotelName: '',
        hotelAddress: '',
        hotelCity: '',
        hotelState: '',
        hotelCountry: '',
        hotelZipCode: '',
        hotelPhoneNumber: '',
        hotelEmail: '',
        images: [],
        alert_message: ''
    };

    componentDidMount() {
        axios
            .get("/api/hotels/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    hotelName: response.data.name,
                    hotelAddress: response.data.address,
                    hotelCity: response.data.city,
                    hotelState: response.data.state,
                    hotelCountry: response.data.country,
                    hotelZipCode: response.data.zip_code,
                    hotelPhoneNumber: response.data.phone_number,
                    hotelEmail: response.data.email,
                    images: response.data.images,
                });
            })
    }

    onChangeHotelName = e => this.setState({hotelName: e.target.value})
    onChangeHotelAddress = e => this.setState({hotelAddress: e.target.value})
    onChangeHotelCity = e => this.setState({hotelCity: e.target.value})
    onChangeHotelState = e => this.setState({hotelState: e.target.value})
    onChangeHotelCountry = e => this.setState({hotelCountry: e.target.value})
    onChangeHotelZipCode = e => this.setState({hotelZipCode: e.target.value})
    onChangeHotelPhoneNumber = e => this.setState({hotelPhoneNumber: e.target.value})
    onChangeHotelEmail = e => this.setState({hotelEmail: e.target.value})

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

        const editedHotel = {
            hotelName: this.state.hotelName,
            hotelAddress: this.state.hotelAddress,
            hotelCity: this.state.hotelCity,
            hotelState: this.state.hotelState,
            hotelCountry: this.state.hotelCountry,
            hotelZipCode: this.state.hotelZipCode,
            hotelPhoneNumber: this.state.hotelPhoneNumber,
            hotelEmail: this.state.hotelEmail,
            images: this.state.images,
        };

        axios
            .put(
                "/api/hotels/" + this.props.match.params.id,
                editedHotel
            )
            .then(res => {
                this.props.history.push("/hotels");
            })
    };

    submitValidation = () =>
        Boolean(this.state.hotelName);

    discardChanges = () => this.props.history.push("/hotels");

    render() {
        return (
            <div>
                <h3 className="text-center">Update Hotel</h3>
                {this.state.alert_message == "success" ? <SuccessAlert message={"Hotel updated successfully."} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Error occurred while updating the Hotel."} /> : null}
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Hotel Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.hotelName}
                                onChange={this.onChangeHotelName}
                            />
                        </div>
                        <div className="form-group col-md-8">
                            <label>Hotel Address: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.hotelAddress}
                                onChange={this.onChangeHotelAddress}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Hotel City: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.hotelCity}
                                onChange={this.onChangeHotelCity}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Hotel State: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.hotelState}
                                onChange={this.onChangeHotelState}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Hotel Country: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.hotelCountry}
                                onChange={this.onChangeHotelCountry}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Hotel ZipCode: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.hotelZipCode}
                                onChange={this.onChangeHotelZipCode}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Hotel PhoneNumber: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.hotelPhoneNumber}
                                onChange={this.onChangeHotelPhoneNumber}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Hotel Email: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.hotelEmail}
                                onChange={this.onChangeHotelEmail}
                            />
                        </div>
                        <div id="imageSection" className="col-md-12">
                            <div className="form-group">
                                <label>Hotel Images</label>
                                <ImageUploader
                                    fileContainerStyle={{ backgroundColor: "#e6ecf7" }}
                                    withIcon={true}
                                    buttonText="Choose image"
                                    onChange={this.onDropImage}
                                    imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                    singleImage={true}
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
                                Update Hotel
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