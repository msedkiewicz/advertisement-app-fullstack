/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Adsbox from '../../features/AdsBox/Adsbox';
import SearchBar from '../../features/SearchBar/SearchBar';
import { API_URL } from '../../../config';
import Loader from '../../features/Loader/Loader';
import { useParams } from 'react-router-dom';

const Search = () => {
  const { searchId } = useParams();
  const [data, setData] = useState([]);
  // const [url, setUrl] = useState(API_URL + '/api/ads/search/')
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    await fetch(API_URL + '/api/ads/search/' + searchId)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchId]);

  return (
    <>
      {' '}
      <SearchBar />
      {data.length === 0 && <h1>Something went wrong.Try again</h1>}
      {loading && <Loader />}
      {!loading && (
        <Row xs={1} md={3} className="g-3 ">
          {data.map((ad) => (
            <Col key={ad._id}>
              <Adsbox {...ad} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Search;
