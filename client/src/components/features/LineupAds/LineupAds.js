import React from 'react';
import { getAllAds } from '../../../redux/adsRedux';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Adsbox from '../AdsBox/AdsBox';

const LineupAds = () => {
  const ads = useSelector(getAllAds);

  return (
    <Row xs={1} md={3} className="g-3 ">
      {ads.map((ad) => (
        <Col key={ad._id}>
          <Adsbox {...ad} />
        </Col>
      ))}
    </Row>
  );
};

export default LineupAds;
