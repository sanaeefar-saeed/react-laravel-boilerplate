import React, {Component} from "react";
import axios from "axios";
import SuccessAlert from '../SuccessAlert';
import ErrorAlert from '../ErrorAlert';

export default class EditPriceList extends Component {

    state = {
        roomTypeName: '',
        roomTypePrice: '',
        alert_message: ''
    };

    clearInputs = () => {
        this.setState({
            roomTypeName: '',
            roomTypePrice: '',
        });
    };

    componentDidMount() {
        axios
            .get("/api/price-lists/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    roomTypeName: response.data.room_type_id,
                    roomTypePrice: response.data.price,
                });
            })
    }

    onChangePriceListName = e => this.setState({roomTypeName: e.target.value})
    onChangeRoomTypePrice = e => this.setState({roomTypePrice: e.target.value})

    onSubmit = e => {
        e.preventDefault();

        const editedPriceList = {
            roomTypeName: this.state.roomTypeName,
            roomTypePrice: this.state.roomTypePrice,
        };

        axios
            .put(
                "/api/price-lists/" + this.props.match.params.id,
                editedPriceList
            )
            .then(res => {
                this.props.history.push("/price-lists");
            })
    };

    submitValidation = () => {
        return Boolean(this.state.roomTypeName) && Boolean(this.state.roomTypePrice);
    };

    render() {
        return (
             <div>
                <h3 className="text-center">Update PriceList</h3>
                {this.state.alert_message == "success" ? <SuccessAlert message={"Price List updated successfully."} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Error occurred while updating the Price List."} /> : null}
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>PriceList Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.roomTypeName}
                                onChange={this.onChangePriceListName}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>PriceList Price: </label>
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
