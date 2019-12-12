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
        case 'ADD_CONTAINER':
            const container = {
                background: '#eceff1',
                'border-color': '#000000',
                'border-radius': 3,
                'border-thickness': 1,
                'font-color': '#FFFFFF',
                'font-size': 0,
                height: 400,
                id: state.controls.length,
                text: '',
                type: 'container',
                width: 400,
                'x-pos': 0,
                'y-pos': 0
            };
            state.controls.push(container);
            return state;
        case 'ADD_LABEL':
            const label = {
                background: '#00',
                'border-color': '#FFFFFF',
                'border-radius': 0,
                'border-thickness': 0,
                'font-color': '#000000',
                'font-size': 11,
                height: 20,
                id: state.controls.length,
                text: 'LABEL',
                type: 'label',
                width: 60,
                'x-pos': 0,
                'y-pos': 0
            };
            state.controls.push(label);
            return state;
        case 'ADD_BUTTON':
            const button = {
                background: '#FFFFFF',
                'border-color': '#000000',
                'border-radius': 5,
                'border-thickness': 2,
                'font-color': '#000000',
                'font-size': 11,
                height: 30,
                id: state.controls.length,
                text: 'Submit',
                type: 'button',
                width: 70,
                'x-pos': 0,
                'y-pos': 0
            };
            state.controls.push(button);
            return state;
        case 'ADD_TEXTFIELD':
            const textfield = {
                background: '#FFFFFF',
                'border-color': '#000000',
                'border-radius': 0,
                'border-thickness': 1,
                'font-color': '#000000',
                'font-size': 14,
                height: 40,
                id: state.controls.length,
                text: 'Example Textfield',
                type: 'textfield',
                width: 200,
                'x-pos': 0,
                'y-pos': 0
            };
            state.controls.push(textfield);
            return state;
        case 'DELETE_CONTROL':
            state.controls.splice(action.controlid, 1);
            state.controls.map(control => control.id = state.controls.indexOf(control));
            return state;
        case 'DUPLICATE_CONTROL':
            var controlToDuplicate = { ...state.controls[action.controlid] };
            controlToDuplicate.id = state.controls.length;
            controlToDuplicate['x-pos'] += 100;
            controlToDuplicate['y-pos'] += 100;
            state.controls.push(controlToDuplicate);
            return state;
        case 'REPOSITION_CONTROL':
            const { deltax, deltay} = action;
            state.controls[action.controlid]['y-pos'] = deltay;
            state.controls[action.controlid]['x-pos'] = deltax;
            return state;
        case 'RESIZE_CONTROL':
            const { height, width} = action;
            state.controls[action.controlid]['height'] += height;
            state.controls[action.controlid]['width'] += width;
            return state;
        default:
            return state;
    }
}

export default wireframeReducer;