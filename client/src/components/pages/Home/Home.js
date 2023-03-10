import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../features/Loader/Loader';
import LineupAds from '../../features/LineupAds/LineupAds';
import SearchBar from '../../features/SearchBar/SearchBar';
import { API_URL } from '../../../config';
import { updateAds } from '../../../redux/adsRedux';
const Home = () => {
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    handleUpdate();
  }, []);

  const handleUpdate = () => {
    setPending(true);
    fetch(API_URL + '/api/ads').then((res) => {
      if (res.status === 200) {
        return res.json().then((ads) => {
          dispatch(updateAds(ads));
          setPending(false);
        });
      }
    });
  };

  return (
    <>
      <SearchBar />
      {pending && <Loader />}
      {!pending && <LineupAds />}
    </>
  );
};

export default Home;
