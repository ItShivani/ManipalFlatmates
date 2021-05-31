  import React, {useEffect, useState} from 'react'
  import {Link} from 'react-router-dom'
  import {useMutation} from '@apollo/react-hooks'
  import gql from 'graphql-tag'
  import {Button,Label,Icon} from 'semantic-ui-react';

  function LikeButton({user, post:{id,likeCount,likes}})
  {
  	const [liked,setLiked] = useState(false);
	useEffect(()=>{
	if(user && likes.find(like=> like.username === user.username)){
		setLiked(true)
	} else setLiked(false)
},[user,likes]);

const [likePost] = useMutation(LikePost_Mutation,{
	variables:{postId:id}
});

const likeButton = user ? (
		liked?(
		<Button color="teal" >
            <Icon name="heart" />
      		Likes
          </Button>
			) : (
		<Button color="teal" basic>
            <Icon name="heart" />
      		Likes
          </Button>
			)
	) : (
		<Button color="teal" basic as={Link} to="/login">
            <Icon name="heart" />
      		Likes
          </Button>

	)
     return (<Button as="div" labelPosition="right" onClick={likePost}>
     		{likeButton}
          <Label basic color="teal">
            {likeCount}
          </Label>
        </Button>
       )
}

const LikePost_Mutation = gql`
	mutation likePost($postId:ID!){
		likePost(postId: $postId){
			id 
			likes{
				id 
				username
			}
			likeCount 
		}
	}
`

export default LikeButton;