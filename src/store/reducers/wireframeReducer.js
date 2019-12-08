const initState = {};

const wireframeReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SELECT_WIREFRAME':
            state = {...action.wireframe};
            return state;
        case 'CLEAR_WIREFRAME':
            state = {};
            return state;
        case 'NAME_CHANGE':
            state.name = action.newName;
            return state;
        default:
            return state;
    }
}

export default wireframeReducer;