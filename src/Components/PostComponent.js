import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addComment, deleteComment, likePost } from '../redux/ActionCreators';
import { FiHeart } from 'react-icons/fi'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { AiOutlinePlusCircle } from '../redux/reducer/node_modules/react-icons/ai'
import ReactTimeAgo from 'react-time-ago'

const mapStateToProps = state => {
    return {
        posts: state.posts,
        users: state.users,
        comments: state.comments
    }
};

const mapDispatchToProps = dispatch => ({
    addComment: (comment, postId, userId, timeAgo) => dispatch(addComment(comment, postId, userId, timeAgo)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    likePost: (postId, userId) => dispatch(likePost(postId, userId))
});

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        this.props.addComment(this.state.comment, this.props.postId, this.props.userId, Date.now());
        this.setState({
            comment: ""
        })
        event.preventDefault();
    }

    componentDidUpdate() {
        var objDiv = document.getElementsByClassName("comment-list")[0];
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    render(){
        return(
            <div>
                {this.props.posts.map((post) => {
                    var user = this.props.users.filter((u) => {
                        return u.id == post.userId
                    })
                    return (
                        <div className="post-outer-div" key={post.id}>
                            <div className="post-div">
                                <div className="image-section">
                                    <img src={post.postImage}></img>
                                </div>
                                <div className="description-comment-section">
                                    <div className="descrpition-section">
                                        <img src={user[0].image}></img>
                                        <p><strong>{user[0].name}</strong> - {post.description}<br /><br /><i>{post.time}</i></p>
                                    </div>
                                    <div className="plus-icon-div">
                                        <AiOutlinePlusCircle className="icon-plus" />
                                    </div>
                                    <div className="comment-section">
                                        <div className="comment-list">
                                            {
                                                comment.comments.map((c) => {
                                                    return (
                                                        <div className="comment-list-item" key={c.id}>
                                                            <img src={user.image}></img>
                                                            <p><strong>{user.name}</strong> - {c.comment}<br/><br/><i><ReactTimeAgo date={c.timeAgo} locale="en-US" />
                                                            &nbsp;&nbsp; 
                                                            <a href="#" onClick={() => deleteComment(c.id)}>Delete</a></i></p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="post-likes">
                                            <div className="post-likes-inner">
                                                <FiHeart className="icon-heart" onClick={() => this.props.likePost(post.id, user[0].id)} /> &nbsp;  <IoChatbubbleOutline className="icon-comment" />
                                                <h4>{post.likes} Likes | {this.props.comments.comments.length} Comments</h4>
                                                <p>8h ago</p>
                                            </div>
                                        </div>
                                        <div className="post-comment">
                                            <div>
                                                <form onSubmit={this.handleSubmit}>
                                                    <input
                                                        type="text"
                                                        value={this.state.comment}
                                                        name="comment"
                                                        placeholder="Write Comment Here"
                                                        onChange={this.handleChange}
                                                        autoComplete="off">
                                                    </input>
                                                    <button type="submit">Post</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);