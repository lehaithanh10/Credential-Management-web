import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Container, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import {
  BsFillHouseFill,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsTelephoneFill,
} from 'react-icons/bs';
import { FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../axiosInstance/axiosInstance';
import ModalContent from '../../components/Modal/Modal';
import PersonCard from '../../components/PersonCard/PersonCard';
import TitleCard from '../../components/Title/TitleCard';
import { renderErrorMessage } from '../../helpers';
import { setCurrentFamily } from '../../redux/family/FamilyAction';
import { RootState } from '../../redux/reduxStore';
import { PersonInfo } from '../../types/person';
import { ModalListState } from '../../types/typeGlobal';
import './FamilyDetail.scss';

interface formEditFamily {
  address: string;
  contact: string;
  nameOwner: string;
  ownerCccd: string;
  ownerId?: number;
}
const FamilyDetail = () => {
  const dispatch = useDispatch();
  const currentFamily = useSelector(
    (state: RootState) => state.family.currentFamily,
  );
  const [listPeople, setListPeople] = useState<PersonInfo[]>([]);
  const [errSearch, setErrSearch] = useState<string[]>();
  const [formEditFamily, setFormEditFamily] = useState<formEditFamily>({
    address: currentFamily.address,
    contact: currentFamily.contact,
    nameOwner: currentFamily.owner,
    ownerCccd: '',
    ownerId: currentFamily.members.find(
      (member) => member.relationship === 'Chủ hộ',
    )?.id,
  });

  const handleChangeEditFamily = (event: any) => {
    setFormEditFamily({
      ...formEditFamily,
      [event.target.name]: event.target.value,
    });
    console.log(formEditFamily);
  };

  const submitEditFamily = async (event: any) => {
    event.preventDefault();

    const res = await instance.put('/hoKhau', {
      id: currentFamily.id,
      address: formEditFamily.address,
      ownerId: formEditFamily.ownerId,
      membersId: currentFamily.members.map((member) => member.id),
    });

    console.log(res.data);
    dispatch(
      setCurrentFamily({
        ...currentFamily,
        ...formEditFamily,
      }),
    );
    handleClose();
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

  const [modalState, setModalState] = useState<ModalListState>(
    ModalListState.CLOSE,
  );

  const handleShowEditFamilyForm = () => {
    setModalState(ModalListState.EDIT_FAMILY_INFO);
  };

  const handleClose = () => {
    setModalState(ModalListState.CLOSE);
  };
  let slug = useParams();

  const fetchListFamilyMember = async () => {
    const res = await instance.get(`/hoKhau/${slug.id}`);
    setListPeople(res.data.response.members);
    dispatch(setCurrentFamily(res.data.response));
  };

  const debounceFetchByCccd = debounce((event: any) => {
    const ownerCCCD = event.target.value;

    handleSearchOwnerByCCCD(ownerCCCD);
  }, 1000);

  const handleSearchOwnerByCCCD = async (ownerCccd: string) => {
    const res = await instance.get(
      `/congDan/search?cccd=${ownerCccd}&sortD=1&sortBy=firstName&page=1`,
    );
    if (res.status) {
      const contact = res.data.response[0].phoneNumber;
      const nameOwner = `${res.data.response[0].firstName} ${res.data.response[0].lastName}`;
      if (contact !== formEditFamily.contact) {
        setFormEditFamily((formEditFamily) => ({ ...formEditFamily, contact }));
      }
      if (nameOwner !== formEditFamily.nameOwner) {
        setFormEditFamily((formEditFamily) => ({
          ...formEditFamily,
          nameOwner,
        }));
      }
      setFormEditFamily((formEditFamily) => ({
        ...formEditFamily,
        ownerCccd,
        ownerId: res.data.response[0].id,
      }));
    } else {
      setErrSearch([res.data.response]);
    }
  };

  useEffect(() => {
    fetchListFamilyMember();
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
          show={modalState === ModalListState.EDIT_FAMILY_INFO}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <ModalContent
            title="Chỉnh sửa thông tin hộ gia đình"
            handleClose={handleClose}
          >
            {errSearch && renderErrorMessage(errSearch)}
            <Form className="edit-family-form" onSubmit={submitEditFamily}>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  onChange={handleChangeEditFamily}
                  name="address"
                  placeholder="Địa chỉ"
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Tên chủ hộ mới</Form.Label>
                  <Form.Control
                    onChange={handleChangeEditFamily}
                    name="nameOwner"
                    placeholder={
                      formEditFamily.nameOwner
                        ? formEditFamily.nameOwner
                        : 'Tên'
                    }
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Căn cước công dân chủ hộ mới</Form.Label>
                  <Form.Control
                    onChange={debounceFetchByCccd}
                    name="ownerCccd"
                    placeholder={
                      formEditFamily.ownerCccd
                        ? formEditFamily.ownerCccd
                        : 'Căn cước công dân'
                    }
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Liên hệ (số điện thoại chủ hộ mới)</Form.Label>
                <Form.Control
                  placeholder={
                    formEditFamily.contact ? formEditFamily.contact : 'Liên hệ'
                  }
                  name="contact"
                  onChange={handleChangeEditFamily}
                />
              </Form.Group>
              <p style={{ fontStyle: 'italic', fontSize: 12 }}>
                *Nhập căn cước công dân để thực hiện tìm kiếm thông tin nhanh
                hơn
              </p>

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
              Tên chủ hộ : {currentFamily.owner}
            </div>
          </div>
          <div className="card-title">
            <BsFillPeopleFill />
            <div className="card-content">
              Số lượng thành viên : {currentFamily.soTVien}
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
