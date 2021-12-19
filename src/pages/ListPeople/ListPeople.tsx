import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalContent from '../../components/Modal/Modal';
import PersonCard from '../../components/PersonCard/PersonCard';
import TitleCard from '../../components/Title/TitleCard';
import { setPageRendering } from '../../redux/pageRendering/PageRenderingAction';
import { PageRender } from '../../types/page';
import { PersonInfo } from '../../types/person';
import { ModalListState } from '../../types/typeGlobal';
import instance from '../../axiosInstance/axiosInstance';

const ListPeople = () => {
  const [listPeople, setListPeople] = useState<PersonInfo[]>([]);
  const [modalState, setModalState] = useState<ModalListState>(
    ModalListState.CLOSE,
  );
  const [formAddPeople, setFormAddPeople] = useState({
    image: '',
    phoneNumber: '',
    relationship: '',
    job: '',
    status: '',
    canCuocCongDan: '',
    firstName: '',
    lastName: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    specialNotes: '',
    departmentTime: null,
  });
  const dispatch = useDispatch();

  const handleShowAddPersonForm = () => {
    setModalState(ModalListState.ADD_FAMILY);
  };

  const handleClose = () => {
    setModalState(ModalListState.CLOSE);
  };

  const handleChangeAddPeople = (event: any) => {
    setFormAddPeople({
      ...formAddPeople,
      [event.target.name]: event.target.value,
    });
    console.log(formAddPeople);
  };

  const navigate = useNavigate();

  const handleClickPersonCard = (canCuocCongDan: string) => {
    console.log(canCuocCongDan);
    navigate(`/personDetail/${canCuocCongDan}`);
  };

  const renderListPeople = (listPeople: PersonInfo[]) => {
    return listPeople.map((person) => {
      return (
        <PersonCard
          name={`${person.firstName} ${person.lastName}`}
          image={person.image}
          phoneNumber={person.phoneNumber}
          relationship={person.relationship}
          job={person.job}
          status={person.status}
          onClick={() => {
            handleClickPersonCard(person.canCuocCongDan);
          }}
        />
      );
    });
  };

  const submitAddFamily = (event: any) => {
    event.preventDefault();

    //call API to add member to db

    handleClose();
  };

  const fetchPeople = async () => {
    try {
      const res = await instance.get(`/congDan`);
      console.log(res.data);
      setListPeople(res.data.response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //call api here to get list family

    dispatch(setPageRendering(PageRender.LIST_CREDENTIAL));

    fetchPeople();
  }, []);

  return (
    <Container>
      <TitleCard title="Danh sách nhân khẩu">
        <AiOutlinePlusCircle
          style={{ margin: '5vh 2vw', cursor: 'pointer' }}
          size={42}
          onClick={handleShowAddPersonForm}
        />
        <Modal
          show={modalState === ModalListState.ADD_FAMILY}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <ModalContent title="Thêm nhân khẩu" handleClose={handleClose}>
            <Form className="add-member-form" onSubmit={submitAddFamily}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Họ</Form.Label>
                  <Form.Control
                    placeholder="Họ"
                    onChange={handleChangeAddPeople}
                    name="firstName"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    placeholder="Tên"
                    onChange={handleChangeAddPeople}
                    name="lastName"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <label className="mb-2">Giới tính</label>
                  <Form.Control
                    placeholder="Giới tính"
                    type="text"
                    list="genders"
                  ></Form.Control>
                  <datalist id="genders">
                    <option value="Nam" />
                    <option value="Nữ" />
                    <option value="Khác" />
                  </datalist>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Căn cước công dân</Form.Label>
                  <Form.Control
                    placeholder="Căn cước công dân"
                    onChange={handleChangeAddPeople}
                    name="canCuocCongDan"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    placeholder="Số điện thoại"
                    onChange={handleChangeAddPeople}
                    name="phoneNumber"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Ngày sinh</Form.Label>
                  <Form.Control
                    placeholder="Ngày sinh"
                    onChange={handleChangeAddPeople}
                    name="dateOfBirth"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Nghề nghiệp</Form.Label>
                  <Form.Control
                    placeholder="Nghề nghiệp"
                    onChange={handleChangeAddPeople}
                    name="job"
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  placeholder="Địa chỉ"
                  onChange={handleChangeAddPeople}
                  name="address"
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Tên chủ hộ</Form.Label>
                  <Form.Control
                    placeholder="Tên chủ hộ"
                    onChange={handleChangeAddPeople}
                    name="nameOwner"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Quan hệ với chủ hộ</Form.Label>
                  <Form.Control
                    placeholder="Quan hệ với chủ hộ"
                    onChange={handleChangeAddPeople}
                    name="relationship"
                  />
                </Form.Group>
              </Row>

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
      <div className="person-container">{renderListPeople(listPeople)}</div>
    </Container>
  );
};

export default ListPeople;
