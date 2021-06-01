import React,{useState} from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {Button,Confirm,Icon} from 'semantic-ui-react'
import {getPosts_QUERY} from '../util/graphql'
function DeleteButton({postId,callback}){
		const [confirm,setConfirm] = useState(false);
		const [deletePost] = useMutation(Delete_Mutation,{
			update(proxy){
				setConfirm(false);
				//TODO : remove post from cache
				const data = proxy.readQuery({
					query:getPosts_QUERY
				});
				data.getPosts = data.getPosts.filter(p=> p.id!=postId);
				proxy.writeQuery({query: getPosts_QUERY,data});
				if(callback){
					callback();
				}
			},
			variables:{
				postId
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
           	onConfirm={deletePost}
           	/>
         </>
		)
}

const Delete_Mutation = gql`
	mutation deletePost($postId:ID!){
		deletePost(postId:$postId)
	}
`

export default DeleteButton;