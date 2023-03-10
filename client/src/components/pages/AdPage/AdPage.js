import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { API_URL, IMAGES_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdById, removeAd, updateAds } from '../../../redux/adsRedux';
import styles from './AdPage.module.scss';
import { Link } from 'react-router-dom';
import ModalDelete from '../../features/ModalDelete/ModalDelete';
const AdPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adId = useParams();
  const id = adId.id;
  const adData = useSelector((state) => getAdById(state, id));

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDelete = (e) => {
    e.preventDefault();
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };
    fetch(API_URL + '/api/ads/' + id, options);
    updateAds();
    navigate('/');
  };
  return (
    <div>
      <Row className="d-flex justify-content-center mt-5">
        if (showModal)
        {
          <ModalDelete
            showModal={showModal}
            handleClose={handleClose}
            handleDelete={handleDelete}
          />
        }
        <Col xs="12" lg="5">
          <Card className={styles.card_wrapper}>
            <Card.Img variant="top" src={IMAGES_URL + adData.image} />

            <Card.Body>
              <Card.Title className="mb-3">Price: {adData.price}$</Card.Title>
              <Card.Subtitle className="mb-3">
                <b>Title: {adData.title}</b>
              </Card.Subtitle>
              <Card.Text className="mb-3">
                <b>Localization: {adData.localization}</b>
              </Card.Text>
              <Card.Text>{adData.description}</Card.Text>
              <Card.Text>Published: {adData.date}</Card.Text>
              <Card.Text>Author: {adData.user.login}</Card.Text>
              <Card.Text>
                Avatar:{' '}
                <img
                  className={styles.avatar}
                  src={IMAGES_URL + adData.user.avatar}
                />
              </Card.Text>
              <Card.Text>Phone number: {adData.user.phoneNumber}</Card.Text>
            </Card.Body>
            <Col className={styles.button} xs="12" lg="4">
              <Link to={'/ads/edit/' + id}>
                <Button variant="outline-info" className="m-2">
                  Edit
                </Button>
              </Link>
              <Button variant="outline-danger" onClick={handleShow}>
                Delete
              </Button>
            </Col>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdPage;
