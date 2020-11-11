import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER,
  INFO_SET,
  TOGGLE_SELECTED,
  TOGGLE_INFO_WINDOW,
  TOGGLE_MARKERS,
  UNPIN_MARKER,
  TOGGLE_SAVE,
  SAVE_PIN,
  SAVE_PIN_SUCCESS,
  SAVE_PIN_FAIL,
} from "../actions/actions";
const initialState = {
  data: [],
  isLoggedIn: false,
  loggedInUser: {},
  errors: {},
  selected: null,
  infoWindow: false,
  markers: [],
  savedPins: [],
  newlyAddedPin: {},
  info: {
    name: "",
    address: "",
    lat: 0,
    lng: 0,
    date: "",
    title: "",
    description: "",
    image_url: "",
    category: "",
    visited: false,
  },
  saveToggleBool: false,
};
export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loggedInUser: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        errors: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        loggedInUser: {},
      };
    case INFO_SET:
      return {
        ...state,
        info: action.payload,
      };

    case TOGGLE_MARKERS:
      return {
        ...state,
        markers: [...state.markers, action.payload],
      };
    case UNPIN_MARKER:
      return {
        ...state,
        markers: action.payload,
      };
    case TOGGLE_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    case TOGGLE_INFO_WINDOW:
      return {
        ...state,
        infoWindow: action.payload,
      };
    case TOGGLE_SAVE:
      return {
        ...state,
        saveToggleBool: action.payload,
      };
    case SAVE_PIN:
      return {
        ...state,
      };
    case SAVE_PIN_SUCCESS:
      return {
        ...state,
        newlyAddedPin: action.payload,
      };
    case SAVE_PIN_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
