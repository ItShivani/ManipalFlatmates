import React,{useState} from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {Button,Confirm,Icon} from 'semantic-ui-react'
import {getPosts_QUERY} from '../util/graphql'

function DeleteButton({postId,commentId,callback}){
		const [confirm,setConfirm] = useState(false);
		const mutation = commentId?DeleteComment_Mutation : Delete_Mutation
		const [deletePostOrComment] = useMutation(mutation,{
			update(proxy){
				setConfirm(false);
				if(!commentId){
					const data = proxy.readQuery({
					query:getPosts_QUERY
				});
				data.getPosts = data.getPosts.filter((p)=> p.id!=postId);
				proxy.writeQuery({query: getPosts_QUERY,data});
				}
				if(callback) callback();
				document.location.reload();
			},
			variables:{
				postId,
				commentId
			}
		});

	return(
		<>
		<Button as="div" onClick={()=> setConfirm(true)}>
              <Icon name="trash" />
            </Button>
           <Confirm 
           	open={confirm}
           	onCancel={()=>setConfirm(false)} 
           	onConfirm={deletePostOrComment}
           	/>
         </>
		)
}

const Delete_Mutation = gql`
	mutation deletePost($postId:ID!){
		deletePost(postId:$postId)
	}
`;

const DeleteComment_Mutation = gql`
	mutation deleteComment($postId:ID!,$commentId:ID!){
		deleteComment(postId:$postId,commentId:$commentId){
			id 
			comments{
				id 
				username 
				createdAt 
				body
			}
			commentCount
		}
	}
`;

export default DeleteButton;
