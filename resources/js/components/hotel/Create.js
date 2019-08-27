import React, {Component} from "react";
import axios from "axios";
import ImageUploader from "react-images-upload";

export default class CreateHotel extends Component {

    state = {
        hotelName: '',
        hotelAddress: '',
        hotelCity: '',
        hotelState: '',
        hotelCountry: '',
        hotelZipCode: '',
        hotelPhoneNumber: '',
        hotelEmail: '',
        images: []
    };

    clearInputs = () => {
        this.setState({
            hotelName: '',
            hotelAddress: '',
            hotelCity: '',
            hotelState: '',
            hotelCountry: '',
            hotelZipCode: '',
            hotelPhoneNumber: '',
            hotelEmail: '',
            images: []
        });
    };

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

        const newHotel = {
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
            .post("/api/hotels", newHotel)
            .then(res => {
                this.clearInputs()
            })
    };

    submitValidation = () => {
        return Boolean(this.state.hotelName);
    };

    render() {
        return (
            <div>
                <h3 className="text-center">Add New Hotel</h3>
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
                                {[...new Set(Object.values(this.state.images))].map(image => (
                                    <img
                                        key={image}
                                        src={image}
                                        alt={"not found"}
                                        width={100}
                                        height={100}
                                        style={{ marginRight: 20 }}
                                        onClick={() => this.removeImage({ image })}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!this.submitValidation()}
                            >
                                Save Hotel
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
