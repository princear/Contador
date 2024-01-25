import {combineReducers} from 'redux';
import TaxLeafReducer from '../Reducers/TaxLeafReducer';
import PaymentReducer from '../Reducers/PaymentReducer';
import DashboardReducer from './DashboardReducer';
import ClientSetupReducer from './ClientSetupReducer';

export default combineReducers({
  TaxLeafReducer,
  PaymentReducer,
  DashboardReducer,
  ClientSetupReducer,
});
