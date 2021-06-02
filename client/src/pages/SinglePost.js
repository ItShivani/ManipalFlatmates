import React,{useContext,useState} from 'react'
import gql from 'graphql-tag'
import {useQuery,useMutation} from '@apollo/react-hooks'
import moment from 'moment'
import {AuthContext} from '../context/auth'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import {Button,Card,Form,Grid,Image,Icon,Label} from 'semantic-ui-react'


function SinglePost(props){
	const postId = props.match.params.postId;
	const {user} = useContext(AuthContext);
	const [comment,setComment] = useState('');
	const {loading,data:{getPost:post}={},error} = useQuery(getPost_QUERY,{
		variables: {
			postId 
		}
	});

const [createComment] = useMutation(CreateComment_Mutation,{
	update(){
		setComment('');
	},
	variables:{
		postId,
		body:comment
	}
});

function deletePostCallback() {
	props.history.push('/');
}

	let postMarkup;
	if(!post){
		postMarkup = <h3> Loading .. </h3>
	}else{
		const {id, body, createdAt,username,comments,likes,likeCount,commentCount} = post;
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
							<Label basic color="teal">
								{commentCount}
							</Label>
						</Button>
						{user && user.username===username && (
								<DeleteButton postId={id} callback={deletePostCallback}/>
							)}
					</Card.Content>
				</Card>
				{user && (
					<Card fluid>
					<Card.Content>
						<p>Interested? Write a comment </p>
						<Form>
							<div className="ui action input fluid">
								<input type="text" placeholder="Type here.." name="comment" value={comment} onChange={event=>setComment(event.target.value)}/>
								<Button type="submit" className="ui button teal" disabled={comment.trim()===''} onClick={createComment}>
									Post Comment
								</Button>
							</div>
						</Form>
					</Card.Content>
					</Card>
					)}
				{comments.map((comment)=>(
					<Card fluid key={comment.id}>
						<Card.Content>
							{user && user.username== comment.username && (
									<DeleteButton postId={id} commentId={comment.id}/>
								)}
							<Card.Header>{comment.username}</Card.Header>
							<Card.Meta>{moment(comment.createdAt).fromNow()} </Card.Meta>
							<Card.Description>
								{comment.body}
							</Card.Description>
						</Card.Content>
					</Card>
					))}
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

const CreateComment_Mutation = gql`
	mutation($postId:String!,$body:String!){
		createComment(postId:$postId,body:$body){
			id 
			comments{
				id 
				body 
				createdAt
				username
			}
			commentCount
		}
	}
`;

export default SinglePost;