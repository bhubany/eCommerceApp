import {
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILED,
  GET_COUNTRY_STATES_REQUEST,
  GET_COUNTRY_STATES_SUCCESS,
  GET_COUNTRY_STATES_FAILED,
  GET_STATE_DISTRICTS_REQUEST,
  GET_STATE_DISTRICTS_SUCCESS,
  GET_STATE_DISTRICTS_FAILED,
} from "../constants/extra";

import { axios_instance } from "../../api/config/config";
import { extra } from "../../api/config/api-endpoints";

export const read_all_countries = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COUNTRIES_REQUEST });
    const response = await axios_instance({
      endpoints: extra.countries,
    });
    dispatch({
      type: GET_COUNTRIES_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_COUNTRIES_FAILED,
      payload: err.response,
    });
  }
};

export const read_all_states = () => async (dispatch) => {
  try {
    dispatch();
    const response = await axios_instance({
      endpoints: extra.states,
    });

    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const read_all_districts = () => async (dispatch) => {
  try {
    const response = await axios_instance({
      endpoints: extra.districts,
    });

    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const read_states_by_country_id =
  ({ countryId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_COUNTRY_STATES_REQUEST });
      let ep = { ...extra.countryStates };
      const response = await axios_instance({
        endpoints: ep,
        query: { id: countryId },
      });

      dispatch({
        type: GET_COUNTRY_STATES_SUCCESS,
        payload: response.data,
      });

      return response.data;
    } catch (err) {
      dispatch({
        type: GET_COUNTRY_STATES_FAILED,
        payload: err.response,
      });
    }
  };

export const read_districts_by_state_id =
  ({ stateId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_STATE_DISTRICTS_REQUEST });
      const response = await axios_instance({
        endpoints: extra.districts,
        query: {
          id: stateId,
        },
      });

      dispatch({
        type: GET_STATE_DISTRICTS_SUCCESS,
        payload: response.data,
      });

      return response.data;
    } catch (err) {
      dispatch({
        type: GET_STATE_DISTRICTS_FAILED,
        payload: err.response,
      });
    }
  };
