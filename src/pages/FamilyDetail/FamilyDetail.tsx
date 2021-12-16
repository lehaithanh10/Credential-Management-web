import React, { useEffect, useState } from 'react';
import { Container, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  BsFillHouseFill,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsTelephoneFill,
} from 'react-icons/bs';
import { FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import ModalContent from '../../components/Modal/Modal';
import PersonCard from '../../components/PersonCard/PersonCard';
import TitleCard from '../../components/Title/TitleCard';
import { setCurrentFamily } from '../../redux/family/FamilyAction';
import { RootState } from '../../redux/reduxStore';
import { PersonInfo } from '../../types/person';
import './FamilyDetail.scss';

export enum ModalFamilyDetailState {
  ADD_FAMILY_MEMBER = 'add-family-member',
  EDIT_FAMILY_INFO = 'edit-family-info',
  CLOSE = 'close',
}

const FamilyDetail = () => {
  const dispatch = useDispatch();
  const currentFamily = useSelector(
    (state: RootState) => state.family.currentFamily,
  );
  const [listPeople, setlistPeople] = useState<PersonInfo[]>([]);
  const [formAddMember, setFormAddMember] = useState({
    name: '',
    image: '',
    phoneNumber: '',
    relation: '',
    job: '',
    status: 'Đang sống',
  });
  const [formEditFamily, setEditFamily] = useState({
    address: '',
    contact: '',
    nameOwner: '',
  });

  const handleChangeAddMember = (event: any) => {
    setFormAddMember({
      ...formAddMember,
      [event.target.name]: event.target.value,
    });
    console.log(formAddMember);
  };

  const submitAddMember = (event: any) => {
    event.preventDefault();

    //call API to add member to db

    setlistPeople([...listPeople, formAddMember]);
    dispatch(
      setCurrentFamily({
        ...currentFamily,
        numberPeople: currentFamily.numberPeople + 1,
      }),
    );
    handleClose();
  };

  const handleChangeEditFamily = (event: any) => {
    setEditFamily({
      ...formEditFamily,
      [event.target.name]: event.target.value,
    });
    console.log(formEditFamily);
  };

  const submitEditFamily = (event: any) => {
    event.preventDefault();

    //call API to edit in db

    dispatch(
      setCurrentFamily({
        ...currentFamily,
        ...formEditFamily,
      }),
    );
    handleClose();
  };

  const [modalState, setModalState] = useState<ModalFamilyDetailState>(
    ModalFamilyDetailState.CLOSE,
  );

  const handleShowAddFamilyMemberForm = () => {
    setModalState(ModalFamilyDetailState.ADD_FAMILY_MEMBER);
  };

  const handleShowEditFamilyForm = () => {
    setModalState(ModalFamilyDetailState.EDIT_FAMILY_INFO);
  };

  const handleClose = () => {
    setModalState(ModalFamilyDetailState.CLOSE);
  };

  const renderListPeople = (listPeople: PersonInfo[]) => {
    return listPeople.map((person) => {
      return (
        <PersonCard
          name={person.name}
          image={person.image}
          phoneNumber={person.phoneNumber}
          relation={person.relation}
          job={person.job}
          status={person.status}
        />
      );
    });
  };

  useEffect(() => {
    //call api to get list people

    setlistPeople([
      {
        name: 'Le Hai Thanh',
        image: '',
        phoneNumber: '0981497748',
        relation: 'Onwer',
        job: 'Developer',
        status: 'Live',
      },
      {
        name: 'Le Thuy Tien',
        image: '',
        phoneNumber: '0365756209',
        relation: 'Sister',
        job: 'Student',
        status: 'Live',
      },
      {
        name: 'Ho Anh Thu',
        image: '',
        phoneNumber: '0983310515',
        relation: 'Mother',
        job: 'Accounting',
        status: 'Live',
      },
      {
        name: 'Le Thuy Tien',
        image: '',
        phoneNumber: '0365756209',
        relation: 'Sister',
        job: 'Student',
        status: 'Live',
      },
    ]);
  }, []);

  return (
    <Container>
      <TitleCard title="Chi tiết hộ gia đình">
        <FaPencilAlt
          style={{ margin: '5vh 2vw', cursor: 'pointer' }}
          size={28}
          onClick={handleShowEditFamilyForm}
        />
        <Modal
          show={modalState === ModalFamilyDetailState.EDIT_FAMILY_INFO}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <ModalContent
            title="Chỉnh sửa thông tin hộ gia đình"
            handleClose={handleClose}
          >
            <Form className="edit-family-form" onSubmit={submitEditFamily}>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  onChange={handleChangeEditFamily}
                  name="address"
                  placeholder="Địa chỉ"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tên chủ hộ</Form.Label>
                <Form.Control
                  onChange={handleChangeEditFamily}
                  name="nameOwner"
                  placeholder="Tên chủ hộ"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Liên hệ</Form.Label>
                <Form.Control
                  placeholder="Liên hệ"
                  name="contact"
                  onChange={handleChangeEditFamily}
                />
              </Form.Group>

              <div className="button-add">
                <Button
                  style={{ width: '20%' }}
                  variant="primary"
                  type="submit"
                >
                  Lưu
                </Button>
              </div>
            </Form>
          </ModalContent>
        </Modal>
      </TitleCard>
      <div className="family-title">
        <div className="card-title-group">
          <div className="card-title">
            <BsFillHouseFill />
            <div className="card-content">
              Địa chỉ : {currentFamily.address}
            </div>
          </div>
          <div className="card-title">
            <BsFillPersonFill />
            <div className="card-content">
              Tên chủ hộ : {currentFamily.nameOwner}
            </div>
          </div>
          <div className="card-title">
            <BsFillPeopleFill />
            <div className="card-content">
              Số lượng thành viên : {currentFamily.numberPeople}
            </div>
          </div>
          <div className="card-title">
            <BsTelephoneFill />
            <div className="card-content">
              Liên hệ : {currentFamily.contact}
            </div>
          </div>
        </div>
      </div>

      <TitleCard title="Thành viên"></TitleCard>
      <div className="person-container">{renderListPeople(listPeople)}</div>
    </Container>
  );
};

export default FamilyDetail;
