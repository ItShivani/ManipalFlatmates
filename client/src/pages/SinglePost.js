import React,{useContext} from 'react'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import moment from 'moment'
import {AuthContext} from '../context/auth'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import {Button,Card,Grid,Image,Icon,Label} from 'semantic-ui-react'


function SinglePost(props){
	const postId = props.match.params.postId;
	const {user} = useContext(AuthContext);
	const {loading,data:{getPost},error} = useQuery(getPost_QUERY,{
		variables: {
			postId 
		}
	});
  if(error) {
    console.log(error);
    return "error"; // blocks rendering
  }

	function deletePostCallback(){
		props.history.push('/')
	}

	let postMarkup;
	if(!getPost){
		postMarkup = <h3> Loading .. </h3>
	}else{
		const {id, body, createdAt,username,comments,likes,likeCount,commentCount} = getPost;
		postMarkup = (
		<Grid>
			<Grid.Row>
			<Grid.Column width={2}>
				<Image
				src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
				size = "small"
				float="right"/>
			</Grid.Column>
			<Grid.Column width={10}>
				<Card fluid>
					<Card.Content>
						<Card.Header>
							{username}
						</Card.Header>
						<Card.Meta>
							{moment(createdAt).fromNow()}
						</Card.Meta>
						<Card.Description>
							{body}
						</Card.Description>
					</Card.Content>
					<hr/>

					<Card.Content extra>
						<LikeButton user={user} post={{id,likeCount,likes}}/>
						<Button 
						as="div"
						labelPosition="right"
						onClick={()=>console.log('Comment on post')}>

							<Button basic color='teal'>
								<Icon name="comments"/>
							</Button>
							<Label basic color="blue">
								{commentCount}
							</Label>
						</Button>
						{user && user.username===username && (
								<DeleteButton postId={id} callback={deletePostCallback}/>
							)}
					</Card.Content>
				</Card>
			</Grid.Column>
			</Grid.Row>
		</Grid>
		);
	}
	return postMarkup;
}

const getPost_QUERY = gql`
	query($postId: ID!){
		getPost(postId: $postId){
			id 
			body 
			createdAt
			username 
			likeCount
			likes{
				username
			}
			commentCount 
			comments{
				id 
				username
				createdAt
				body
			}
		}
	}
`;

export default SinglePost;