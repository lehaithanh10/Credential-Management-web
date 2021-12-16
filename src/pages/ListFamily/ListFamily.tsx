import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import FamilyCard from '../../components/FamilyCard/FamilyCard';
import './ListFamily.scss';
import TitleCard from '../../components/Title/TitleCard';
import { FamilyInfo } from '../../types/family';
import { useDispatch } from 'react-redux';
import { setPageRendering } from '../../redux/pageRendering/PageRenderingAction';
import { PageRender } from '../../types/page';
import { useNavigate } from 'react-router-dom';
import { setCurrentFamily } from '../../redux/family/FamilyAction';
import ModalContent from '../../components/Modal/Modal';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export enum ModalListFamilyState {
  ADD_FAMILY = 'add-family',
  CLOSE = 'close',
}

const ListFamily = () => {
  const [listFamily, setListFamily] = useState<FamilyInfo[]>([]);
  const [modalState, setModalState] = useState<ModalListFamilyState>(
    ModalListFamilyState.CLOSE,
  );
  const [formAddFamily, setFormAddFamily] = useState({
    address: '',
    numberPeople: 1,
    contact: '',
    nameOwner: '',
    id: '5',
    ownerPersonalId: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findFamily = (listFamily: FamilyInfo[], familyId: string) => {
    const foundFamily = listFamily.filter((family) => family.id === familyId);
    console.log('foundFamily', foundFamily);
    return foundFamily[0];
  };

  const handleShowAddFamilyMemberForm = () => {
    setModalState(ModalListFamilyState.ADD_FAMILY);
  };

  const handleClose = () => {
    setModalState(ModalListFamilyState.CLOSE);
  };

  const handleChangeAddFamily = (event: any) => {
    setFormAddFamily({
      ...formAddFamily,
      [event.target.name]: event.target.value,
    });
    console.log(formAddFamily);
  };

  const handleClickFamilyCard = (familyId: string) => {
    console.log(familyId);

    dispatch(setCurrentFamily(findFamily(listFamily, familyId)));

    navigate(`/familyDetail/${familyId}`);
  };

  const submitAddFamily = (event: any) => {
    event.preventDefault();

    //call API to add member to db

    setListFamily([...listFamily, formAddFamily]);

    handleClose();
  };

  const renderListFamily = (listFamily: FamilyInfo[]) => {
    return listFamily.map((family) => {
      return (
        <FamilyCard
          key={family.id}
          address={family.address}
          numberPeople={family.numberPeople}
          contact={family.contact}
          nameOwner={family.nameOwner}
          onClick={() => handleClickFamilyCard(family.id)}
        />
      );
    });
  };

  useEffect(() => {
    //call api here to get list family
    dispatch(setPageRendering(PageRender.LIST_FAMILY));

    setListFamily([
      {
        address: '39 Dich Vong Cau Giay',
        numberPeople: 4,
        contact: '0981497748',
        nameOwner: 'Le Hai THanh',
        id: '1',
      },
      {
        address: '37 Dich Vong Cau Giay',
        numberPeople: 4,
        contact: '0981497748',
        nameOwner: 'Le Hai Long',
        id: '2',
      },
      {
        address: '35 Dich Vong Cau Giay',
        numberPeople: 4,
        contact: '0981497748',
        nameOwner: 'Le Hai Dang',
        id: '3',
      },
      {
        address: '33 Dich Vong Cau Giay',
        numberPeople: 4,
        contact: '0981497748',
        nameOwner: 'Le Hai Tien',
        id: '4',
      },
    ]);
  }, []);

  return (
    <Container>
      <TitleCard title="Danh sách các hộ gia đình">
        <AiOutlinePlusCircle
          style={{ margin: '5vh 2vw', cursor: 'pointer' }}
          size={42}
          onClick={handleShowAddFamilyMemberForm}
        />
        <Modal
          show={modalState === ModalListFamilyState.ADD_FAMILY}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <ModalContent title="Thêm hộ gia đình viên" handleClose={handleClose}>
            <Form className="add-member-form" onSubmit={submitAddFamily}>
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
                  placeholder="Tên chủ hộ"
                  onChange={handleChangeAddFamily}
                  name="nameOwner"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Số căn cước công dân chủ hộ</Form.Label>
                <Form.Control
                  placeholder="Số căn cước công dân chủ hộ"
                  onChange={handleChangeAddFamily}
                  name="ownerPersonalId"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Liên hệ</Form.Label>
                <Form.Control
                  placeholder="Số điện thoại chủ hộ"
                  onChange={handleChangeAddFamily}
                  name="contact"
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
