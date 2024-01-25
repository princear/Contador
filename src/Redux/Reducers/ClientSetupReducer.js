import { INTEREST_LIST,PROFESSION_LIST, } from '../Actions/types';

const initialstate = {
    INTEREST_LIST: [],
    PROFESSION_LIST:[],
   
  
};

const ClientSetupReducer = (state = initialstate, action) => {
  // console.log(
  //   'action.payloadaction.payloadaction.payloadaction.payload',
  //   action.payload,
  // );
  switch (action.type) {
    case INTEREST_LIST:
      return { ...state, INTEREST_LIST: action.payload };
      case PROFESSION_LIST:
      return { ...state, PROFESSION_LIST: action.payload };

   
  }

  return state;
};

export default ClientSetupReducer;
