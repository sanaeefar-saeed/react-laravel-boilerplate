import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

export default class Index extends Component {

    constructor() {
        super();
        this.state = {
            priceLists: [],
        }
    }

    componentDidMount() {
        axios.get('/api/price-lists')
            .then(response => {
                this.setState({
                    priceLists: response.data,
                });
            });
    }

    onDelete(priceListId) {
        axios.delete('/api/price-lists/' + priceListId)
            .then(response => {

                let priceLists = this.state.priceLists;

                for (var i = 0; i < priceLists.length; i++) {
                    if (priceLists[i].id == priceListId) {
                        priceLists.splice(i, 1);
                        this.setState({ priceLists: priceLists });
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
                <h3 className="text-center">Price List</h3>
                <div
                    id="createNewPrice"
                    style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                </div>
                <Link to={"/price-lists/create"}>Create</Link>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Room Type Name</th>
                        <th>Price($)</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.priceLists.map(priceList => {
                            return(
                                <tr key={priceList.id}>
                                    <td>{priceList.room_type_id}</td>
                                    <td>{priceList.price}</td>
                                    <td>
                                        <Link
                                            to={`/price-lists/edit/${priceList.id}`}
                                            className="btn btn-primary"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={"#"}
                                            className="btn btn-danger"
                                            onClick={this.onDelete.bind(this, priceList.id)}
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