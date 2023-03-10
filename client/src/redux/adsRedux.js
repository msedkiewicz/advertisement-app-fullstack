import { API_URL } from '../config';

export const getAllAds = ({ ads }) => ads;

const createActionName = (actionName) => `app/ads/${actionName}`;
const UPDATE_ADS = createActionName('UPDATE_ADS');

export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });

export const fetchData = () => {
  return (dispatch) => {
    fetch(API_URL + '/api/ads')
      .then((res) => res.json())

      .then((ads) => dispatch(updateAds(ads)));
  };
};

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_ADS:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default adsReducer;
