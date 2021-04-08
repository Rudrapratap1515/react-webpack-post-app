import { AiOutlineTransaction } from 'react-icons/ai';
import { POSTS } from '../../myInfo/Post';
import * as ActionTypes from '../ActionTypes'


export const Posts = (state = POSTS, action) => {
        switch (action.type) {
                case ActionTypes.LIKE_POST:
                        var post = POSTS[state.findIndex(post => post.id == action.payload.postId)]
                        post.likes += 1
                        return [...state]
                default:
                        return state;
        }
}
