import React, { Component } from "react";
import axios from "axios";
import "./search.css";
import { API_URL, config } from "../config";

class Search extends Component {
  state = {
    query: "",
    results: [],
    loader: false,
    message: ""
  };
  fetchSearchResults(query) {
    const searchUrl = `${API_URL}?query=${query}`;
    axios
      .get(searchUrl, config, { cancelToken: this.cancel })
      .then(res => {
        const resultNotFoundMsg = !res.data.products.length
          ? "There are no more search results. Please try a new search."
          : "";
        this.setState({
          results: res.data.products,
          message: resultNotFoundMsg,
          loading: true
        });
      })
      .catch(error => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch results.Please check network"
          });
        }
      });
  }
  handleOnInputChange = event => {
    const query = event.target.value;
    this.setState({ query, results: [], loading: true, message: "" }, () => {
      this.fetchSearchResults(query);
    });
    if (this.cancle) {
      this.cancle.cancel();
    }
    this.cancle = axios.CancelToken.source();
  };

  render() {
    const query = this.state.query;
    return (
      <div className="container">
        <div className="input-box">
          <form className="form">
            <input
              type="text"
              className="input-inner"
              title="Search for products, brands and more"
              name="search"
              placeholder="Search for products, brands and more"
              onChange={this.handleOnInputChange}
              value={query}
            />
          </form>
        </div>
        <div className="row">
          {this.state.results.map((result) => (
            <div class="col-md-4">
              <br />
              <div className="card">
                <div className="image-container">
                  <img
                    className="card-img-top"
                    src={result.productBaseInfoV1.imageUrls["800x800"]}
                    alt={result.productBaseInfoV1.title}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    <a
                      href={result.productBaseInfoV1.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.productBaseInfoV1.title}
                    </a>
                  </h5>
                  <p className="card-text">
                    {result.productBaseInfoV1.productDescription}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>
                      Price:{" "}
                      {result.productBaseInfoV1.flipkartSellingPrice.amount}{" "}
                      {result.productBaseInfoV1.flipkartSellingPrice.currency}
                    </strong>
                  </li>
                  <li className="list-group-item">
                    <strong>Brand Name: </strong>
                    {result.productBaseInfoV1.productBrand}
                  </li>
                  <li className="list-group-item">
                    {result.productBaseInfoV1.productBrand}
                  </li>
                </ul>
                <div className="card-body">
                  <div className="product-discount bg-success ">
                    Discount {result.productBaseInfoV1.discountPercentage} %
                  </div>
                  <a
                    type="button"
                    className="btn btn-danger"
                    href={result.productBaseInfoV1.productUrl}
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="loader"></div>
      </div>
    );
  }
}

export default Search;
