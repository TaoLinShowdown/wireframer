import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import M from 'materialize-css';

import WireframeCard from './WireframeCard.js';
// import { deleteWireframeSuccess, deleteWireframeError } from '../../store/actions/actionCreators';

class WireframeLinks extends React.Component {

    openModal = (id) => {
        var elems = document.querySelectorAll('.modal-' + id);
        var mymodals = M.Modal.init(elems);
        mymodals[0].open();
    }

    handleDeleteList = (id) => {
        var firestore = getFirestore();
        firestore.collection('wireframes').doc(id).delete().then(function() {
            console.log("DELETED WIREFRAME " + id);
        }).catch(function(error) {
            console.log("FAILED TO DELETE WIREFRAME " + id + error);
        });
    }

    render() {
        var wireframes = this.props.wireframes;
        
        if(wireframes) {
            // only show wireframes that are yours
            wireframes = wireframes.filter(wireframe => 
                wireframe.userid === this.props.auth.uid
            );

            // sort wireframes by the last access last_access
            wireframes.sort((a, b) => {
                if(a.last_access > b.last_access) {
                    return -1;
                } else if(a.last_access < b.last_access) {
                    return 1;
                } else {
                    return 0;
                }
            })
        }
        
        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map(wireframe => (
                    <div key={wireframe.id} >
                        <div className="wireframe_link_holder">
                            <div className="trash-can btn" onClick={this.openModal.bind(this, wireframe.id)}>
                                <i className="material-icons trash-can-icon">close</i>
                            </div>
                            <Link to={'/wireframe/' + wireframe.id} key={wireframe.id}>
                                <WireframeCard wireframe={wireframe} />
                            </Link>
                        </div>

                        <div id="delete-list" className={"modal modal-" + wireframe.id}>
                            <div className="modal-content">
                            <h4>Delete {wireframe.name}?</h4>
                            <p>Are you sure you want to delete this wireframe?</p>
                            <p>You will NOT be able to retrieve the wireframe!</p>
                            </div>
                            <div className="modal-footer">
                            <div className="modal-close btn-flat red white-text " onClick={this.handleDeleteList.bind(this, wireframe.id)}>Delete</div>
                            <div className="modal-close btn-flat">Cancel</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframeLinks);