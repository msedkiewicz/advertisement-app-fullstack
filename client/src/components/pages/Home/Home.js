import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../../redux/adsRedux';
import Loader from '../../features/Loader/Loader';
import LineupAds from '../../features/LineupAds/LineupAds';

const Home = () => {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    setPending(false);
  }, [dispatch]);

  console.log(pending);
  return (
    <>
      {pending && <Loader />}
      {!pending && <LineupAds />}
    </>
  );
};

export default Home;
