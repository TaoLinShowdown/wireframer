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
        case 'HEIGHT_CHANGE':
            state.height = action.newHeight;
            return state;
        case 'WIDTH_CHANGE':
            state.width = action.newWidth;
            return state;
        default:
            return state;
    }
}

export default wireframeReducer;