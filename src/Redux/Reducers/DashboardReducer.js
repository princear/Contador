import { DASHBOARD_LIST, DASHBOARD_MESSAGE_LIST, DASHBOARD_LIST_TWO } from '../Actions/types';

const initialstate = {
  DASHBOARD_LIST: [],
  DASHBOARD_MESSAGE_LIST: [],
  DASHBOARD_LIST_TWO: []
};

const DashboardReducer = (state = initialstate, action) => {
  // console.log(
  //   'action.payloadaction.payloadaction.payloadaction.payload',
  //   action.payload,
  // );
  switch (action.type) {
    case DASHBOARD_LIST:
      return { ...state, DASHBOARD_LIST: action.payload };
    case DASHBOARD_MESSAGE_LIST:
      return { ...state, DASHBOARD_MESSAGE_LIST: action.payload };
    case DASHBOARD_LIST_TWO:
      return { ...state, DASHBOARD_LIST_TWO: action.payload };
  }

  return state;
};

export default DashboardReducer;
