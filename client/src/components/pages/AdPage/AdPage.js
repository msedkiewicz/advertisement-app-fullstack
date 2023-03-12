import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { API_URL, IMAGES_URL } from '../../../config';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdById, updateAds } from '../../../redux/adsRedux';
import styles from './AdPage.module.scss';
import { Link } from 'react-router-dom';
import ModalDelete from '../../features/ModalDelete/ModalDelete';
import { getUser } from '../../../redux/usersRedux';
import { getUserId } from '../../../redux/userData';
const AdPage = () => {
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const adId = useParams();
  const id = adId.id;
  const adData = useSelector((state) => getAdById(state, id));
  const userId = useSelector(getUserId);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  console.log(adData.user._id + userId);

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
        {showModal && (
          <ModalDelete
            showModal={showModal}
            handleClose={handleClose}
            handleDelete={handleDelete}
          />
        )}
        ;
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
                  alt="user avatar"
                />
              </Card.Text>
              <Card.Text>Phone number: {adData.user.phoneNumber}</Card.Text>
            </Card.Body>
            {userId === adData.user._id && (
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
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdPage;
