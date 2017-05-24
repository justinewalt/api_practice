import React, { Component } from 'react';
import { Header, Button, Table } from 'semantic-ui-react';

class Products extends Component {
  getProducts = () => {
    // fetch call to api to get all products
    // need to set state of all the products that get returned from api
  }

  products = () => {
    // responsible for rendering an array of product UI
  }

  render() {
    return(
      <div>
        <Header as='h3' textAlign='center'>Products</Header>
      </div>
    )
  }
}

export default Products;