import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getFirestore } from 'redux-firestore';
import { firebaseConnect } from 'react-redux-firebase';
import wireframeJson from './TestWireframeData.json'

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframes').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframes').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        wireframeJson.wireframes.forEach(wireframe => {
            fireStore.collection('wireframes').add({
                    last_access: new Date(),
                    userid: wireframe.userid,
                    name: wireframe.name,
                    width: wireframe.width,
                    height: wireframe.height,
                    controls: wireframe.controls
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default compose(
    firebaseConnect(),
    connect(mapStateToProps)
)(DatabaseTester);