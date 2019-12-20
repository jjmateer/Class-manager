import axios from "axios";
import { returnErrors } from "../actions/error-actions";

import {
    VIEW_CURRICULUM,
    EDIT_CURRICULUM,
    EDIT_CURRICULUM_SUCCESS,
    EDIT_CURRICULUM_FAIL
} from "./types";

export const viewCurriculum = () => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.get("http://localhost:3001/api/curriculum/view", config)
        .then(res => {
            dispatch({
                type: VIEW_CURRICULUM,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
}

export const editCurriculum = data => (dispatch) => {
    dispatch({ type: EDIT_CURRICULUM });
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.post('http://localhost:3001/api/curriculum/edit', data, config)
        .then(res => {
            dispatch({
                type: EDIT_CURRICULUM_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: EDIT_CURRICULUM_FAIL
            });
        });
};