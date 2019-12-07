import React from 'react';
import { getFirestore } from 'redux-firestore';

class WireframeCard extends React.Component {
    updateTime = (id) => {
        const fireStore = getFirestore();
        fireStore.collection('wireframes').doc(id).update({
            last_access: new Date()
        }).then(function() {
            console.log("Document " + id + " date updated");
        }).catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    render() {
        const { wireframe } = this.props;
        // console.log("wireframeCard, wireframe.id: " + wireframe.id);
        return (
            <div className="card z-depth-1 todo-list-link" onClick={this.updateTime.bind(this, wireframe.id)}>
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{wireframe.name}</span>
                </div>
            </div>
        );
    }
}
export default WireframeCard;