import React, {Component} from "react";
import axios from "axios";

export default class CreatePriceList extends Component {

    state = {
        roomTypeName: '',
        roomTypePrice: '',
    };

    clearInputs = () => {
        this.setState({
            roomTypeName: '',
            roomTypePrice: '',
        });
    };

    onChangeRoomTypeName = e => this.setState({roomTypeName: e.target.value})
    onChangeRoomTypePrice = e => this.setState({roomTypePrice: e.target.value})

    onSubmit = e => {
        e.preventDefault();

        const newPriceList = {
            roomTypeName: this.state.roomTypeName,
            roomTypePrice: this.state.roomTypePrice,
        };

        axios
            .post("/api/price-lists", newPriceList)
            .then(res => {
                this.clearInputs()
                this.setState({ alert_message: "success" })
            }).catch(error => {
                this.setState({ alert_message: "error" });
        })
    };

    submitValidation = () => {
        return Boolean(this.state.roomTypeName) && Boolean(this.state.roomTypePrice);
    };

    render() {
        return (
             <div>
                <h3 className="text-center">Add New PriceList</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>RoomType Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.roomTypeName}
                                onChange={this.onChangeRoomTypeName}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>RoomType Price: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.roomTypePrice}
                                onChange={this.onChangeRoomTypePrice}
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!this.submitValidation()}
                            >
                                Save PriceList
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
