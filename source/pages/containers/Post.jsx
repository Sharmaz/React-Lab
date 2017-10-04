import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../api';
import PostBody from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import Comment from '../../comments/components/Comment';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
      post: {},
      comments: [],
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const [
      post,
      comments,
    ] = await Promise.all([
      api.posts.getSingle(this.props.id),
      api.posts.getComments(this.props.id),
    ]);

    const user = await api.users.getSingle(post.userId);

    this.setState({
      loading: false,
      user,
      post,
      comments,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <section name="post">
        <PostBody
          {...this.state.post}
          user={this.state.user}
          comments={this.state.comments}
        />
        <section>
          {this.state.comments
            .map(comment => (
              <Comment key={comment.id} {...comment} />
            ))
          }
        </section>
      </section>
    );
  }
}

Post.defaultProps = {
  id: 1,
};

Post.propTypes = {
  id: PropTypes.number,
};


export default Post;
