import React, { useEffect, useState } from 'react';
import { Container, Modal, Table } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  RiTimerFill
} from 'react-icons/ri';
import { GrDocumentTxt, GrMoney } from 'react-icons/gr';
import FormUpdateDetailEvent from '../../components/Form/FormUpdateDetailEvent';
import ModalContent from '../../components/Modal/Modal';
import TitleCard from '../../components/Title/TitleCard';
import { EventFundingInfo, FamilyFundingInfo } from '../../types/eventFunding';
import { ModalListState } from '../../types/typeGlobal';

const EventDetail = () => {
  const [eventFunding, setEventFunding] = useState<EventFundingInfo>({
    id: 'string',
    name: 'string',
    totalAmount: 1,
    time: 'string',
    description: 'string',
    listFamily: [
      {
        address: '39 Dich Vong Cau Giay',
        owner: 'Le Hai Thanh',
        amount: 1,
        time: '15/10/2021',
      },
    ],
  });

  const renderContributeEventFunding = (
    eventFundingListFamily: FamilyFundingInfo[] | undefined,
  ) => {
    return eventFundingListFamily?.map((family, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{family.owner}</td>
          <td>{family.address}</td>
          <td>{family.time} </td>
          <td>{family.amount}</td>
        </tr>
      );
    });
  };

  const [modalState, setModalState] = useState<ModalListState>(
    ModalListState.CLOSE,
  );

  const handleShowEditFamilyForm = () => {
    setModalState(ModalListState.UPDATE_EVENT);
  };

  const handleClose = () => {
    setModalState(ModalListState.CLOSE);
  };

  const [formUpdateEvent, setFormUpdateEvent] = useState({
    owner: '',
    time: '',
    address: '',
    amount: 0,
  });

  const handleUpdateEvent = (event: any) => {
    setFormUpdateEvent({
      ...formUpdateEvent,
      [event.target.name]: event.target.value,
    });
    console.log(formUpdateEvent);
  };

  const submitUpdateEvent = (event: any) => {
    event.preventDefault();

    //call API to add member to db

    setEventFunding({
      ...eventFunding,
      listFamily: [...eventFunding.listFamily, formUpdateEvent],
    });

    handleClose();
  };

  useEffect(() => {
    //call APi here to get event Detail
    const eventFunding: EventFundingInfo = {
      id: '1',
      name: 'Đóng góp hội khuyến học',
      time: '15/10/2021',
      totalAmount: 4,
      description: '',
      listFamily: [
        {
          address: '39 Dich Vong Cau Giay',
          owner: 'Le Hai Thanh',
          amount: 1,
          time: '15/10/2021',
        },
        {
          address: '39 Dich Vong Cau Giay',
          owner: 'Le Hai Thanh',
          amount: 1,
          time: '15/10/2021',
        },
        {
          address: '39 Dich Vong Cau Giay',
          owner: 'Le Hai Thanh',
          amount: 1,
          time: '15/10/2021',
        },
        {
          address: '39 Dich Vong Cau Giay',
          owner: 'Le Hai Thanh',
          amount: 1,
          time: '15/10/2021',
        },
      ],
    };

    setEventFunding(eventFunding);
  }, []);

  return (
    <div>
      <Container>
        <TitleCard title="Chi tiết quỹ đã thu">
          <AiOutlinePlusCircle
            style={{ margin: '5vh 2vw', cursor: 'pointer' }}
            size={42}
            onClick={handleShowEditFamilyForm}
          />
          <Modal
            show={modalState === ModalListState.UPDATE_EVENT}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <ModalContent title="Thêm quỹ" handleClose={handleClose}>
              <FormUpdateDetailEvent
                handleUpdateEvent={handleUpdateEvent}
                submitUpdatevent={submitUpdateEvent}
              ></FormUpdateDetailEvent>
            </ModalContent>
          </Modal>
        </TitleCard>
        <div className="family-title">
          <div className="card-title-group">
            <div className="card-title">
              <GrMoney />
              <div className="card-content">Tên quỹ : {eventFunding.name}</div>
            </div>
            <div className="card-title">
              <RiTimerFill />
              <div className="card-content">
                Thời gian thu : {eventFunding.time}
              </div>
            </div>
            {!!eventFunding.description && (
              <div className="card-title">
                <GrDocumentTxt />
                <div className="card-content">
                  Mô tả : {eventFunding.description}
                </div>
              </div>
            )}
          </div>
        </div>
        <Table responsive="lg" className="mt-2" bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên chủ hộ</th>
              <th>Địa chỉ hộ</th>
              <th>Thời gian thu</th>
              <th>Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Lar</td>
              <td>@twitter</td>
            </tr> */}
            {renderContributeEventFunding(eventFunding?.listFamily)}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>
                Tổng số tiền
              </td>
              <td>{eventFunding?.totalAmount}</td>
            </tr>
          </tfoot>
        </Table>
      </Container>
    </div>
  );
};

export default EventDetail;
