import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import M from "materialize-css";
import { Rnd } from 'react-rnd';

import { clearWireframe, 
        nameChange, 
        heightChange, 
        widthChange, 
        addContainer, 
        addLabel, 
        addButton, 
        addTextfield, 
        deleteControl, 
        duplicateControl,
        repositionControl,
        resizeControl, } from '../../store/actions/actionCreators';
import WireframeControlResizeComponent from './WireframeControlResizeComponent';
import WireframeControlProperties from './WireframeControlProperties';

class WireframeScreen extends Component {
  state = {
    unsavedChanges: false,
    zoom: 1,
    selectedControl: -1
  }

  componentDidMount = () => {
    document.onkeydown = this.handleKeyDown;
  }

  handleNameChange = (e) => {
    this.props.nameChange(e.target.value);
    this.setState({ unsavedChanges: true });
  }

  handleSave = () => {
    // grab the wireframe in store
    // push it to firebase
    const firestore = getFirestore();
    firestore.collection('wireframes').doc(this.props.wireframeid).update({
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
      this.props.clearWireframe();
      this.props.history.push("/");
    } else {
      var elems = document.querySelectorAll('.modal');
      var mymodals = M.Modal.init(elems);
      mymodals[0].open();
    }
  }

  handleSaveAndClose = () => {
    this.handleSave();
    this.props.clearWireframe();
    this.props.history.push("/");
  }

  handleJustClose = () => {
    this.props.clearWireframe();
    this.props.history.push("/");
  }

  handleZoomIn = () => {
    this.setState({
      zoom: this.state.zoom * 2
    }, () => { this.forceUpdate() });
  }

  handleZoomOut = () => {
    this.setState({
      zoom: this.state.zoom / 2
    }, () => { this.forceUpdate() });
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
    this.setState({ unsavedChanges: true });
  }

  handleAddContainer = () => {
    this.props.addContainer();
    this.setState({ unsavedChanges: true, selectedControl: this.props.wireframe.controls.length - 1 });
  }

  handleAddLabel = () => {
    this.props.addLabel();
    this.setState({ unsavedChanges: true, selectedControl: this.props.wireframe.controls.length - 1 });
  }

  handleAddButton = () => {
    this.props.addButton();
    this.setState({ unsavedChanges: true, selectedControl: this.props.wireframe.controls.length - 1 });
  }

  handleAddTextfield = () => {
    this.props.addTextfield();
    this.setState({ unsavedChanges: true, selectedControl: this.props.wireframe.controls.length - 1 });
  }

  handleSelectControl = (id) => {
    this.setState({ selectedControl: id });
  }

  handleDeselect = (e) => {
    if(e.target.id === "wireframe-container"){
      this.setState({ selectedControl: -1 });
    }
  }

  handleKeyDown = (e) => {
    const { keyCode, ctrlKey } = e;
    if(keyCode === 46) {
      e.preventDefault();
      this.handleDeleteControl();
    } else if(keyCode === 68 && ctrlKey) {
      e.preventDefault();
      this.handleDuplicateControl();
    }
  }

  handleDeleteControl = () => {
    if(this.state.selectedControl !== -1) {
      this.props.deleteControl(this.state.selectedControl);
      this.setState({ unsavedChanges: true, selectedControl: -1 });
    }
  }

  handleDuplicateControl = () => {
    if(this.state.selectedControl !== -1) {
      this.props.duplicateControl(this.state.selectedControl);
      this.setState({ unsavedChanges: true, selectedControl: this.props.wireframe.controls.length - 1 });
    }
  }

  handleReposition = (e, d) => {
    const { x, y } = d;
    this.props.repositionControl(x, y, this.state.selectedControl);
    this.setState({ unsavedChanges: true });
  }

  handleResize = (e, d, r, delta, pos) => {
    const { height, width } = delta;
    const { x, y } = pos;
    this.props.resizeControl(height, width, this.state.selectedControl);
    this.props.repositionControl(x, y, this.state.selectedControl);
    this.setState({ unsavedChanges: true }, () => { this.forceUpdate() });
  }

  render() {
    if (!this.props.auth.uid) {
      return <Redirect to="/" />;
    }

    var { name, height, width, controls } = this.props.wireframe;
    // console.log(name, height, width, controls);

    return (
      <div className="row">

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
          <div className="controls white z-depth-1">
            <div>
              <div id="example-container"></div>
              <div className="btn-small" onClick={this.handleAddContainer}>Add Container</div>
            </div>
            <div>
              <div id="example-label">Example Label</div>
              <div className="btn-small" onClick={this.handleAddLabel}>Add Label</div>
            </div>
            <div>
              <button id="example-button">Submit</button>
              <div className="btn-small" onClick={this.handleAddButton}>Add Button</div>
            </div>
            <div>
              <input type="text" value="" readOnly placeholder="Example Textfield" id="example-textfield"/>
              <div className="btn-small" onClick={this.handleAddTextfield}>Add Textfield</div>
            </div>
          </div>
        </div>

        <div id="wireframe-window" className="wireframe-window col s8 z-depth-1" style={{
          height: "753px",
          overflow: 'auto',
          padding: '0'
        }}>
          <div id="wireframe-container" className="wireframe-container white z-depth-1" onClick={this.handleDeselect} style={{
            position: "relative",
            height: height + "px",
            width: width + "px",
            overflow: 'visible',
            transform: 'scale(' + this.state.zoom + ')',
            transformOrigin: 'top left'
          }}>
            {controls && controls.map((control) => {
              var style = {
                height: "100%",
                width: "100%",
                background: control['background'],
                border: control['border-thickness'] + "px solid " + control['border-color'],
                borderRadius: control['border-radius'] + "px",
                fontSize: control['font-size'] + "px",
                color: control['font-color'],
              };
              var selected = this.state.selectedControl === control.id ? true : false;
              return (
                <Rnd
                  key={control.id}
                  onMouseDown={this.handleSelectControl.bind(this, control.id)}
                  scale={this.state.zoom}
                  bounds='parent'
                  size={{ width: control['width'], height: control['height'] }}
                  position={{ x: control['x-pos'], y: control['y-pos'] }}
                  style={{ zIndex: control.type === "container" ? 0 : 1 }}
                  onDragStop={this.handleReposition}
                  onResizeStop={this.handleResize}
                  enableResizing={{
                    top: false,
                    right: false,
                    bottom: false,
                    left: false,
                    bottomLeft: selected,
                    bottomRight: selected,
                    topLeft: selected,
                    topRight: selected,
                  }}
                  resizeHandleComponent={{
                    bottomLeft: <WireframeControlResizeComponent />,
                    bottomRight: <WireframeControlResizeComponent />,
                    topLeft: <WireframeControlResizeComponent />,
                    topRight: <WireframeControlResizeComponent />,
                  }} >
                  {
                    control.type === "container" ?
                      <div
                        style={style}>
                      </div> : 
                    control.type === "label" ? 
                      <div
                        style={style}>
                        {control.text}
                      </div> : 
                    control.type === "button" ?
                      <button
                        style={style}>
                        {control.text}
                      </button> :
                    <input
                      type="text"
                      style={style}
                      placeholder={control.text} />
                  }
                </Rnd>
              )})}
          </div>
        </div>

        <div id="control-properties" className="control-properties col s2 cyan lighten-5 z-depth-1">
          {this.state.selectedControl === -1 ? 
            <div>No control selected</div> :
            <WireframeControlProperties 
              selectedControl={this.state.selectedControl}
              changesMade={() => {this.setState({ unsavedChanges: true })}} />
          }
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
  const id = ownProps.match.params.id;
  const { wireframes } = state.firestore.data;
  const wireframe = state.wireframe ? state.wireframe : wireframes[id]

  return {
    auth: state.firebase.auth,
    wireframe: wireframe,
    wireframeid: id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nameChange: (newName) => { dispatch(nameChange(newName)) },
    heightChange: (newHeight) => { dispatch(heightChange(newHeight)) },
    widthChange: (newWidth) => { dispatch(widthChange(newWidth)) },
    clearWireframe: () => { dispatch(clearWireframe()) },
    addContainer: () => { dispatch(addContainer()) },
    addLabel: () => { dispatch(addLabel()) },
    addButton: () => { dispatch(addButton()) },
    addTextfield: () => { dispatch(addTextfield()) },
    deleteControl: (id) => { dispatch(deleteControl(id)) },
    duplicateControl: (id) => { dispatch(duplicateControl(id)) },
    repositionControl: (x, y, id) => { dispatch(repositionControl(x, y, id)) },
    resizeControl: (height, width, id) => { dispatch(resizeControl(height, width, id)) },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'wireframes' },
  ]),
)(WireframeScreen);