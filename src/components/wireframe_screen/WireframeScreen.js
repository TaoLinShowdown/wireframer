import React, { Component } from 'react';
// import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
// import { getFirestore } from 'redux-firestore';
// import M from "materialize-css";

class WireframeScreen extends Component {
  render() {
      return (
        <div className="">
          Hi lol

        </div>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeSortOrder: (newOrder) => { dispatch(changeSortOrder(newOrder)) }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'wireframes' },
  ]),
)(WireframeScreen);