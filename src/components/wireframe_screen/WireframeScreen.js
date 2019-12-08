import React, { Component } from 'react';
// import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import M from "materialize-css";

import { clearWireframe, nameChange, heightChange, widthChange } from '../../store/actions/actionCreators';

class WireframeScreen extends Component {
  state = {
    unsavedChanges: false
  }

  handleNameChange = (e) => {
    this.props.nameChange(e.target.value);
    this.setState({
      unsavedChanges: true
    });
  }

  handleSave = () => {
    // grab the wireframe in store
    // push it to firebase
    const firestore = getFirestore();
    firestore.collection('wireframes').doc(this.props.wireframe.id).update({
      ...this.props.wireframe,
      last_access: new Date()
    }).then(() => {
      console.log("SAVED WIREFRAME " + this.props.wireframe.id);
      this.setState({
        unsavedChanges: false
      });
    }).catch((error) => {
      console.log("FAILED TO SAVE WIREFRAME: " + error);
    });
  }

  handleClose = () => {
    // check if changes were saved
    // if not, pull up modal to notify user to save changes
    if(!this.state.unsavedChanges) {
      this.props.history.push("/");
      this.props.clearWireframe();
    } else {
      var elems = document.querySelectorAll('.modal');
      var mymodals = M.Modal.init(elems);
      mymodals[0].open();
    }
  }

  handleSaveAndClose = () => {
    this.handleSave();
    this.props.history.push("/");
    this.props.clearWireframe();
  }

  handleJustClose = () => {
    this.props.history.push("/");
    this.props.clearWireframe();
  }

  handleZoomIn = () => {

  }

  handleZoomOut = () => {

  }

  handleDimensionsChange = (e) => {
    if(/^\d+$/.test(e.target.value)) {
      if(Number(e.target.value) <= 5000 && Number(e.target.value) >= 1){
        document.getElementById("dimensions-button").classList.remove("disabled");
      } else {
        document.getElementById("dimensions-button").classList.add("disabled");
      }
    } else {
      document.getElementById("dimensions-button").classList.add("disabled");
    }
  }

  handleUpdateDimensions = () => {
    const newHeight = Number(document.getElementById("wireframe-height").value);
    const newWidth = Number(document.getElementById("wireframe-width").value);
    this.props.heightChange(newHeight);
    this.props.widthChange(newWidth);
    this.setState({
      unsavedChanges: true
    });
  }

  render() {
    var { name, height, width, controls } = this.props.wireframe;

    return (
      <div className="wireframe-container row">

        <div className="wireframe-details col s2 cyan lighten-5 z-depth-1">
          <div className="input-field cyan lighten-5">
            <input id="wireframe-name" type="text" defaultValue={name} onChange={this.handleNameChange}/>
            <label className="active">Name</label>
          </div>
          <div className="close-save">
            <i className="material-icons" onClick={this.handleZoomIn}>zoom_in</i>
            <i className="material-icons" onClick={this.handleZoomOut}>zoom_out</i>
            <div className="btn-small" onClick={this.handleSave}>Save</div>
            <div className="btn-small" onClick={this.handleClose}>Close</div>
          </div>
          <div className="dimensions">
            <div className="input-field cyan lighten-5">
              <input id="wireframe-height" type="text" defaultValue={height} onChange={this.handleDimensionsChange}/>
              <label className="active">Height</label>
            </div>
            <div className="input-field cyan lighten-5">
              <input id="wireframe-width" type="text" defaultValue={width} onChange={this.handleDimensionsChange}/>
              <label className="active">Width</label>
            </div>
            <div id="dimensions-button" className="btn-small disabled" onClick={this.handleUpdateDimensions}>Update</div>
          </div>
        </div>

        <div className="wireframe col s8 white">
          wireframe
        </div>

        <div className="control-properties col s2 cyan lighten-5">
          controls
        </div>

        <div id="close-wireframe" className="modal">
          <div className="modal-content">
          <h4>Return to homescreen?</h4>
          <p>You have unsaved changes. Would you like to save your work first?</p>
          </div>
          <div className="modal-footer">
          <div className="modal-close btn-flat green lighten-3" onClick={this.handleSaveAndClose}>Save and Close</div>
          <div className="modal-close btn-flat green lighten-4" onClick={this.handleJustClose}>Close</div>
          <div className="modal-close btn-flat green lighten-5">Cancel</div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  var id = ownProps.match.params.id;

  return {
    auth: state.firebase.auth,
    wireframe: state.wireframe,
    wireframeid: id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeSortOrder: (newOrder) => { dispatch(changeSortOrder(newOrder)) }
    nameChange: (newName) => { dispatch(nameChange(newName)) },
    heightChange: (newHeight) => { dispatch(heightChange(newHeight)) },
    widthChange: (newWidth) => { dispatch(widthChange(newWidth)) },
    clearWireframe: () => { dispatch(clearWireframe()) }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'wireframes' },
  ]),
)(WireframeScreen);