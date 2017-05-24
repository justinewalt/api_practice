import React, { Component } from 'react';
import { Header, Button, Table, Form } from 'semantic-ui-react';

class Products extends Component {
  defaultData = { name: '', description: '', base_price: '' };
  state = { products: [], ...this.defaultData };
  baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';

  getProducts = () => {
    fetch(`${this.baseUrl}/products`)
      .then( res => res.json() )
      .then( products => this.setState({ products }));
  }

  deleteProduct = (productId) => {
    fetch(`${this.baseUrl}/products/${productId}`, {
      method: 'DELETE'
    }).then( () => {
      let { products } = this.state;
      this.setState({ products: products.filter( product => product.id !== productId )})
    })
  }

  products = () => {
    return this.state.products.map( product => {
      return(
        <Table.Row key={ product.id }>
          <Table.Cell>{ product.name }</Table.Cell>
          <Table.Cell>{ product.description }</Table.Cell>
          <Table.Cell>{ product.base_price || 0 }</Table.Cell>
          <Table.Cell>
            <Button color='red' onClick={ () => this.deleteProduct(product.id) }>Delete</Button>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  handleChange = (e) => {
    let { target: { value, id } } = e;
    this.setState({ [id]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { name, description, base_price, products } = this.state;
    let product = { product: { name, description, base_price } };

    fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then( res => res.json() )
      .then( product => {
        if (products.length === 0)
          this.getProducts();
        else
          this.setState({ products: [...products, product] });
        
        this.setState({ ...this.defaultData });
      })
  }



  render() {
    let { name, description, base_price } = this.state;
    return(
      <div>
        <Header as='h3' textAlign='center'>Products</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            id='name'
            label='What do you call your product?'
            value={name}
            onChange={this.handleChange}
          />
          <Form.Input
            id='description'
            label='El Description!'
            value={description}
            onChange={this.handleChange}
          />
          <Form.Input
            id='base_price'
            label='Tell me yo Base Price homie!'
            value={base_price}
            onChange={this.handleChange}
          />
          <Button basic color='green' onClick={ this.handleSubmit }>
            Submit
          </Button>
        </Form>
        <br />
        <Button basic color='blue' fluid onClick={ this.getProducts }>
          Get Products
        </Button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.products() }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default Products;