import {GET_PAYMENT_LIST,GET_ORDER_DETAILS} from '../Actions/types';

const initialstate = {
  GET_PAYMENT_LIST: [],
  GET_ORDER_DETAILS:[]
};

const PaymentReducer = (state = initialstate, action) => {
  //   console.log(
  //     'action.payloadaction.payloadaction.payloadaction.payload',
  //     action.payload,
  //   );
  switch (action.type) {
    case GET_PAYMENT_LIST:
      return {...state, GET_PAYMENT_LIST: action.payload};
      case GET_ORDER_DETAILS:
        return {...state, GET_ORDER_DETAILS: action.payload};
  }

  return state;
};

export default PaymentReducer;
