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
  TOGGLE_SAVED_PIN_INFO_WINDOW,
  TOGGLE_MARKERS,
  UNPIN_MARKER,
  TOGGLE_SAVE,
  SAVE_PIN,
  SAVE_PIN_SUCCESS,
  SAVE_PIN_FAIL,
  TOGGLE_DELETE,
  DELETE_PIN,
  DELETE_PIN_SUCCESS,
  DELETE_PIN_FAIL,
  TOGGLE_EDIT,
  EDIT_PIN,
  EDIT_PIN_SUCCESS,
  EDIT_PIN_FAIL,
  GET_USER_PINS,
  GET_USER_PINS_SUCCESS,
  GET_USER_PINS_FAIL,
  TOGGLE_SAVED_HOMEPIN_INFO_WINDOW,
  TOGGLE_SAVE_HOMEPIN,
  SAVE_HOMEPIN,
  SAVE_HOMEPIN_SUCCESS,
  SAVE_HOMEPIN_FAIL,
  TOGGLE_HOMEPIN_DELETE,
  DELETE_HOMEPIN,
  DELETE_HOMEPIN_SUCCESS,
  DELETE_HOMEPIN_FAIL,
  TOGGLE_HOMEPIN_EDIT,
  EDIT_HOMEPIN,
  EDIT_HOMEPIN_SUCCESS,
  EDIT_HOMEPIN_FAIL,
  GET_USER_HOMEPIN,
  GET_USER_HOMEPIN_SUCCESS,
  GET_USER_HOMEPIN_FAIL,
  CHECK_SESSION,
} from "../actions/actions";
const initialState = {
  data: [],
  isLoggedIn: false,
  loggedInUser: {},
  errors: {},
  selected: null,
  infoWindow: false,
  savedPinInfoWindow: false,
  savedHomepinInfoWindow: false,
  markers: [],
  userPins: [],
  homepin: [],
  newlyAddedPin: {},
  newlyAddedHomepin: {},
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
  editToggleBool: false,
  deleteToggleBool: false,

  saveHomepinToggleBool: false,
  editHomepinToggleBool: false,
  deleteHomepinToggleBool: false,
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
    case TOGGLE_SAVED_PIN_INFO_WINDOW:
      return {
        ...state,
        savedPinInfoWindow: action.payload,
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
    case GET_USER_PINS:
      return {
        ...state,
      };
    case GET_USER_PINS_SUCCESS:
      return {
        ...state,
        userPins: action.payload,
      };
    case GET_USER_PINS_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    case TOGGLE_EDIT:
      return {
        ...state,
        editToggleBool: action.payload,
      };
    case EDIT_PIN:
      return {
        ...state,
      };
    case EDIT_PIN_SUCCESS:
      return {
        ...state,
      };
    case EDIT_PIN_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    case TOGGLE_DELETE:
      return {
        ...state,
        deleteToggleBool: action.payload,
      };
    case DELETE_PIN:
      return {
        ...state,
      };
    case DELETE_PIN_SUCCESS:
      return {
        ...state,
        userPins: action.payload,
      };
    case DELETE_PIN_FAIL:
      return {
        ...state,
        errors: action.payload,
      };

    case TOGGLE_SAVED_HOMEPIN_INFO_WINDOW:
      return {
        ...state,
        savedHomepinInfoWindow: action.payload,
      };
    case TOGGLE_SAVE_HOMEPIN:
      return {
        ...state,
        saveHomepinToggleBool: action.payload,
      };
    case SAVE_HOMEPIN:
      return {
        ...state,
      };
    case SAVE_HOMEPIN_SUCCESS:
      return {
        ...state,
        newlyAddedHomepin: action.payload,
      };
    case SAVE_HOMEPIN_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    case GET_USER_HOMEPIN:
      return {
        ...state,
      };
    case GET_USER_HOMEPIN_SUCCESS:
      return {
        ...state,
        homepin: action.payload,
      };
    case GET_USER_HOMEPIN_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    case TOGGLE_HOMEPIN_EDIT:
      return {
        ...state,
        editHomepinToggleBool: action.payload,
      };
    case EDIT_HOMEPIN:
      return {
        ...state,
      };
    case EDIT_HOMEPIN_SUCCESS:
      return {
        ...state,
      };
    case EDIT_HOMEPIN_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    case TOGGLE_HOMEPIN_DELETE:
      return {
        ...state,
        deleteToggleBool: action.payload,
      };
    case DELETE_HOMEPIN:
      return {
        ...state,
      };
    case DELETE_HOMEPIN_SUCCESS:
      return {
        ...state,
        homepin: action.payload,
      };
    case DELETE_HOMEPIN_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    case CHECK_SESSION:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};
