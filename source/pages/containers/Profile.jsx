import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import api from '../../api';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      posts: [],
      loading: true,
    };
  }

  async componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const [
      user,
      posts,
    ] = await Promise.all([
      api.users.getSingle(this.props.params.id),
      api.users.getPosts(this.props.params.id),
    ]);

    this.setState({
      user,
      posts,
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <section name="profile">
        <h2>
          <FormattedMessage
            id="title.profile"
            values={{
              name: this.state.user.name,
            }}
          />
        </h2>
        <fieldset>
          <FormattedMessage id="profile.field.basic" tagName="legend" />
          <input type="email" value={this.state.user.email} disabled />
        </fieldset>
        {this.state.user.address && (
          <fieldset>
            <FormattedMessage id="profile.field.address" tagName="legend" />
            <address>
              {this.state.user.address.street} <br />
              {this.state.user.address.suite} <br />
              {this.state.user.address.city} <br />
              {this.state.user.address.zipcode} <br />
            </address>
          </fieldset>
          )}
        <section>
          {this.state.posts
            .map(post => (
              <Post
                key={post.id}
                user={this.state.user}
                {...post}
              />
            ))
          }
        </section>
      </section>
    );
  }
}

Profile.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};

Profile.defaultProps = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
