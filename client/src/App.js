import React from 'react';
import Products from './components/Products';
import { Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const App = () => (
  <div>
    <Grid container columns={16}>
      <Grid.Row>
        <Grid.Column computer={8} tablet={16} mobile={16}>
          <Products />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default App;
