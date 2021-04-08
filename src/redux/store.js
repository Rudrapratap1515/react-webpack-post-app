import { createStore, combineReducers } from 'redux';
import { Posts } from './reducer/post'
import { Users } from './reducer/user'
import { Comments } from './reducer/comments'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            posts: Posts,
            users: Users,
            comments: Comments
        })
    );

    return store;
}