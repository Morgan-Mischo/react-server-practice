import axios from "axios";
import {
  GET_ENTRIES,
  DELETE_ENTRY,
  EDIT_ENTRY,
  SAVE_ENTRY,
} from "./actionTypes";

const initialState = {
  entries: [],
  error: false,
};

export function getEntries(writerId) {
  let data = axios.get(`/api/entries/${writerId}`).then(res => res.data);
  return {
    type: GET_ENTRIES,
    payload: data,
  };
}

export function deleteEntry(entryId) {
  let data = axios.delete(`/api/entries/${entryId}`).then(res => res.data);
  return {
    type: DELETE_ENTRY,
    payload: data,
  };
}

export function editEntry(entryId, newTitle, newContent) {
  let data = axios
    .put(`/api/posts/edit/${entryId}`, { newTitle, newContent })
    .then(res => res.data);
  return {
    type: EDIT_ENTRY,
    payload: data,
  };
}

export function saveEntry(title, content) {
  let data = axios
    .post("/api/entries", { title, content })
    .then(res => res.data);
  return {
    type: SAVE_ENTRY,
    payload: data,
  };
}

export default function entriesReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case GET_ENTRIES + "_FULFILLED":
      return { entries: payload, error: false };
    case GET_ENTRIES + "_REJECTED":
      return { ...state, error: payload };
    case EDIT_ENTRY + "_FULFILLED":
      return { ...state, entries: payload };
    case DELETE_ENTRY + "_FULFILLED":
      return { ...state, entries: payload };
    case SAVE_ENTRY + "_FULFILLED":
      return { ...state, entries: payload };
    default:
      return state;
  }
}
