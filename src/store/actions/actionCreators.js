// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECDTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

export function registerSuccess() {
    return { type: 'REGISTER_SUCCESS' }
};
export function registerError(error) { 
    return { type: 'REGISTER_ERROR', error }
};
export function loginSuccess() {
    return { type: 'LOGIN_SUCCESS' }
};
export function loginError(error) {
    return { type: 'LOGIN_ERROR', error }
};
export function logoutSuccess() {
    return { type: 'LOGOUT_SUCCESS' }
};

// HOME SCREEN

export function selectWireframe(wireframe) {
    return { type: 'SELECT_WIREFRAME', wireframe }
};
export function clearWireframe() {
    return { type: 'CLEAR_WIREFRAME' }
};
export function nameChange(newName) {
    return { type: 'NAME_CHANGE', newName }
};
export function heightChange(newHeight) {
    return { type: 'HEIGHT_CHANGE', newHeight }
};
export function widthChange(newWidth) {
    return { type: 'WIDTH_CHANGE', newWidth }
};
export function addContainer() {
    return { type: 'ADD_CONTAINER' }
};
export function addLabel() {
    return { type: 'ADD_LABEL' }
};
export function addButton() {
    return { type: 'ADD_BUTTON' }
};
export function addTextfield() {
    return { type: 'ADD_TEXTFIELD' }
};
export function deleteControl(controlid) {
    return { type: 'DELETE_CONTROL', controlid }
};
export function duplicateControl(controlid) {
    return { type: 'DUPLICATE_CONTROL', controlid }
};
export function repositionControl(deltax, deltay, controlid) {
    return { type: 'REPOSITION_CONTROL', deltax, deltay, controlid }
};
export function resizeControl(height, width, controlid) {
    return { type: 'RESIZE_CONTROL', height, width, controlid }
};
export function textChange(newText, controlid) {
    return { type: 'TEXT_CHANGE', newText, controlid }
};
export function fontSizeChange(newFontSize, controlid) {
    return { type: 'FONTSIZE_CHANGE', newFontSize, controlid }
};
export function textColorChange(newColor, controlid) {
    return { type: 'TEXTCOLOR_CHANGE', newColor, controlid }
};
export function backgroundChange(newColor, controlid) {
    return { type: 'BACKGROUND_CHANGE', newColor, controlid }
};
export function borderColorChange(newColor, controlid) {
    return { type: 'BORDERCOLOR_CHANGE', newColor, controlid }
};
export function borderThicknessChange(newThicc, controlid) {
    return { type: 'BORDERTHICKNESS_CHANGE', newThicc, controlid }
};
export function borderRadiusChange(newRad, controlid) {
    return { type: 'BORDERRADIUS_CHANGE', newRad, controlid }
};