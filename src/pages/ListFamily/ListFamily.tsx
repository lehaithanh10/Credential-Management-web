import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Row } from 'react-bootstrap';
import FamilyCard from '../../components/FamilyCard/FamilyCard';
import './ListFamily.scss';
import TitleCard from '../../components/Title/TitleCard';
import { FamilyInfo } from '../../types/family';
import { useDispatch, useSelector } from 'react-redux';
import { setPageRendering } from '../../redux/pageRendering/PageRenderingAction';
import { PageRender } from '../../types/page';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentFamily,
  setCurrentListFamily,
} from '../../redux/family/FamilyAction';
import ModalContent from '../../components/Modal/Modal';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ModalListState } from '../../types/typeGlobal';
import instance from '../../axiosInstance/axiosInstance';
import { debounce } from 'lodash';
import { PersonInfo } from '../../types/person';
import { RootState } from '../../redux/reduxStore';
import { renderErrorMessage } from '../../helpers';

const ListFamily = () => {
  // const [listFamily, setListFamily] = useState<FamilyInfo[]>([]);
  const listFamily: FamilyInfo[] = useSelector(
    (state: RootState) => state.family.currentListFamily,
  );
  const [err, setErr] = useState<string[]>([]);
  const [ownerSearched, setOwnerSearched] = useState<PersonInfo | null>();
  const [modalState, setModalState] = useState<ModalListState>(
    ModalListState.CLOSE,
  );
  const [formAddFamily, setFormAddFamily] = useState({
    address: '',
    ownerId: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findFamily = (listFamily: FamilyInfo[], familyId: string) => {
    const foundFamily = listFamily.filter((family) => family.id === familyId);
    console.log('foundFamily', foundFamily);
    return foundFamily[0];
  };

  const handleShowAddFamilyForm = () => {
    setModalState(ModalListState.ADD_FAMILY);
  };

  const handleClose = () => {
    setModalState(ModalListState.CLOSE);
  };

  const handleChangeAddFamily = debounce((event: any) => {
    setFormAddFamily({
      ...formAddFamily,
      [event.target.name]: event.target.value,
    });
    console.log(formAddFamily);
  }, 500);

  const handleClickFamilyCard = (familyId: string) => {
    dispatch(setCurrentFamily(findFamily(listFamily, familyId)));

    navigate(`/familyDetail/${familyId}`);
  };

  const submitAddFamily = async (event: any) => {
    event.preventDefault();

    //call API to add member to db

    try {
      const res = await instance.post('/hoKhau', formAddFamily);

      // console.log(res);

      if (!res.data.status) {
        setErr([...err, res.data.response]);
      } else {
        dispatch(setCurrentListFamily([...listFamily, res.data.response]));
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderListFamily = (listFamily: FamilyInfo[]) => {
    return listFamily.map((family) => {
      return (
        <FamilyCard
          id={family.id}
          address={family.address}
          soTVien={family.soTVien}
          contact={family.contact}
          owner={family.owner}
          onClick={() => handleClickFamilyCard(family.id)}
        />
      );
    });
  };

  const fetchFamily = async () => {
    try {
      const res = await instance.get(`/hoKhau`);
      dispatch(setCurrentListFamily(res.data.response));
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetOwnerByCCCD = async (event: any) => {
    try {
      const ownerCCCD = event.target.value;
      const res = await instance.get(
        `/congDan/search?cccd=${ownerCCCD}&sortD=1&sortBy=firstName&page=1`,
      );
      setOwnerSearched(res.data.response[0]);
      setFormAddFamily({
        ...formAddFamily,
        ownerId: res.data.response[0].id,
      });
      console.log(res.data.response[0].id);
    } catch (err) {
      setOwnerSearched(null);
      console.log(err);
    }
  };

  useEffect(() => {
    //call api here to get list family
    dispatch(setPageRendering(PageRender.LIST_FAMILY));

    fetchFamily();
  }, []);

  return (
    <Container>
      <TitleCard title="Danh sách các hộ gia đình">
        <AiOutlinePlusCircle
          style={{ margin: '5vh 2vw', cursor: 'pointer' }}
          size={42}
          onClick={handleShowAddFamilyForm}
        />
        <Modal
          show={modalState === ModalListState.ADD_FAMILY}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <ModalContent title="Thêm hộ gia đình" handleClose={handleClose}>
            <Form className="add-member-form" onSubmit={submitAddFamily}>
              {!!err.length && (
                <div className="alert alert-danger" role="alert">
                  {renderErrorMessage(err)}
                </div>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  placeholder="Địa chỉ"
                  onChange={handleChangeAddFamily}
                  name="address"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tên chủ hộ</Form.Label>
                <Form.Control
                  placeholder={
                    !!ownerSearched
                      ? `${ownerSearched?.firstName} ${ownerSearched?.lastName} `
                      : 'Tên chủ hộ'
                  }
                  onChange={handleChangeAddFamily}
                  name="nameOwner"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Số căn cước công dân chủ hộ</Form.Label>
                <Form.Control
                  placeholder="Số căn cước công dân chủ hộ"
                  onChange={handleChangeAddFamily}
                  onBlur={handleGetOwnerByCCCD}
                  name="ownerPersonalId"
                />
              </Form.Group>

              <div className="button-add">
                <Button
                  style={{ width: '20%' }}
                  variant="primary"
                  type="submit"
                >
                  Thêm
                </Button>
              </div>
            </Form>
          </ModalContent>
        </Modal>
      </TitleCard>
      <div className="list-family-container">
        {renderListFamily(listFamily)}
      </div>
    </Container>
  );
};

export default ListFamily;
