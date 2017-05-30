import React, { Component } from 'react';
import { Header, Form, List, Icon, Card, Image } from 'semantic-ui-react';
import moment from 'moment';

class Tweets extends Component {
  state = { tweets: [], handle: '' };

  getTweets = (e) => {
    // make a fetch call to our express server
    // out express server is going to make the api call to twitter
    // our express server is going to return the json from twitter
    e.preventDefault();
    let { handle } = this.state;
    
    fetch(`/api/tweets/${handle}`)
      .then( res => res.json() )
      .then( tweets => this.setState({ tweets, handle: '' }));
  }

  tweets = () => {
    // display the UI for the tweets in state
    return this.state.tweets.map( tweet => {
      return(
        <Card key={ tweet.id }>
          {/*if (tweet.entities.media[0].media_url) {
            let url = tweet.entities.media[0].media_url    
            return( <Image src='url' />
            )
          } else {
            
          }*/}
          <Card.Content>
            <Card.Header> {moment(tweet.created_at).format('llll')} </Card.Header> 
            <Card.Meta> Joined in 2016 </Card.Meta> 
            <Card.Description> {tweet.text} </Card.Description> 
          </Card.Content> 
          <Card.Content extra>
            <a>
              <Icon name='users' />
                {tweet.retweet_count} 
            </a>
            <a>
              <Icon name='like' />
                {tweet.favorite_count}
            </a>
          </Card.Content> 
        </Card>
      );
    });
  }

  render() {
    let { handle } = this.state;
    return(
      <div>
        <Header as='h3' textAlign='center'>Tweets</Header>
        <Form onSubmit={this.getTweets}>
          <Form.Input 
            label='Twitter Handle'
            value={handle}
            onChange={e => this.setState({ handle: e.target.value }) }
          />
        </Form>
        <List divided relaxed>
          { this.tweets() }
        </List>
      </div>
    );
  }
}

export default Tweets;