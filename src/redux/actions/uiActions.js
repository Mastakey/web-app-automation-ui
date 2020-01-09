//app reducers
import { SET_BREADCRUMBS } from "../types";

export const setBreadcrumbs = breadcrumbs => async dispatch => {
      dispatch({
        type: SET_BREADCRUMBS,
        payload: breadcrumbs
      });
};

