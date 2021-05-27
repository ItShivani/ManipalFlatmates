import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

function Home() {
    const {
    loading,
    data : {getPosts:posts}
  } = useQuery(getPosts_QUERY);
  if(posts){
    console.log(posts);
  }

    return (
     <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>All Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading ..</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const getPosts_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;