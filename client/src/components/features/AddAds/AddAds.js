import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import { addAd, updateAds } from '../../../redux/adsRedux';
import { getUserId } from '../../../redux/userData';
import { getUser } from '../../../redux/usersRedux';
import AdForm from '../AdForm/AdForm';

const AddAds = () => {
  const user = useSelector(getUser);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const handleSubmit = (ad) => {
    const fd = new FormData();
    console.log(ad.user);
    fd.append('title', ad.title);
    fd.append('description', ad.description);
    fd.append('date', ad.date);
    fd.append('price', ad.price);
    fd.append('localization', ad.localization);
    fd.append('phoneNumber', ad.phoneNumber);
    fd.append('image', ad.image);
    fd.append('user', ad.user);

    const options = {
      method: 'POST',
      body: fd,
      credentials: 'include',
    };
    fetch(API_URL + `/api/ads`, options).then((res) => {
      if (res.status === 200) {
        dispatch(addAd(ad));
        dispatch(updateAds())
        navigate('/')
      }
    });
  };

  return <AdForm action={handleSubmit} actionText="Add" userId={userId} />;
};

export default AddAds;
