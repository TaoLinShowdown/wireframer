import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import { clearWireframe } from '../../store/actions/actionCreators';

class Navbar extends React.Component {

  handleClick = () => {
    this.props.clearWireframe();
  }

  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;

    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo" onClick={this.handleClick}>@wireframer</Link>
          {links}
        </div>
      </nav>
    );
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearWireframe: () => { dispatch(clearWireframe()) }
  };
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(Navbar);