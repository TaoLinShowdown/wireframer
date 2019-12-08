import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import WireframeLinks from './WireframeLinks.js';
import { selectWireframe } from '../../store/actions/actionCreators';

class HomeScreen extends Component {
    handleNewList = () => {
        const newWireframe = {
            name: "Unknown",
            width: 600,
            height: 800,
            controls: [],
            last_access: new Date(),
            userid: this.props.auth.uid
        };

        const fireStore = getFirestore();
        const newWireframeDoc = fireStore.collection('wireframes').doc();
        const newWireframeId = newWireframeDoc.id;

        newWireframeDoc.set({
            ...newWireframe
        }).then(() => {
            this.props.history.push("/wireframe/" + newWireframeId);
            this.props.selectWireframe(newWireframe);
            console.log("ADDED NEW WIREFRAME " + newWireframeId);
        }).catch((err) => {
            console.log("ADD NEW WIREFRAME ERROR: " + err);
        });;
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireframeLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @wireframer
                        </div>
                        
                        <div className="home_new_list_container center">
                            <button className="home_new_list_button cyan darken-4 grey-text text-lighten-4 btn waves-effect waves-light" onClick={this.handleNewList}>
                                Create New Wireframe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectWireframe: (wireframe) => { dispatch(selectWireframe(wireframe)) }
    };
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'wireframes' },
    ]),
)(HomeScreen);