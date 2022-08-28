import React from 'react';
import { Box } from '@mui/material';
// import { Link } from 'react-router-dom'

// import { Spinner } from '../../components/Spinner'
// import { PostAuthor } from './PostAuthor'
// import { TimeAgo } from './TimeAgo'
// import { ReactionButtons } from './ReactionButtons'

import { useGetUsersQuery } from '../../../api/apiSlice.js';
import {apiSlice} from '../../../api/apiSlice.js';

// let PostExcerpt = ({ post }) => {
//   return (
//     <article className="post-excerpt" key={post.id}>
//       <h3>{post.title}</h3>
//       <div>
//         <PostAuthor userId={post.user} />
//         <TimeAgo timestamp={post.date} />
//       </div>
//       <p className="post-content">{post.content.substring(0, 100)}</p>

//       <ReactionButtons post={post} />
//       <Link to={`/posts/${post.id}`} className="button muted-button">
//         View Post
//       </Link>
//     </article>
//   )
// }

export const UsersList = () => {
           
            const {
                data: users = [],
                isLoading,
                isFetching,
                isSuccess,
                isError,
                error,
            } = useGetUsersQuery();
            console.log(useGetUsersQuery());

            let content

            // if (isLoading || isFetching) {
            //     content = <Box text="Loading..." />
            // } else if (isSuccess) {
            //     content = users.map(user => (<Box key={user.id}>{user.first_name}</Box>))
            // } else if (isError) {
            //     content = <div>{error.toString()}</div>
            // }

            return (
                <section className="users-list">
                <h2>Users</h2>
                {content}
                </section>
            )
    }
