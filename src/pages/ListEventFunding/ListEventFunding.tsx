import React, { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EventFundingCard from '../../components/EventFundingCard/EventFundingCard';
import FormAddEvent from '../../components/Form/FormAddEvent';
import ModalContent from '../../components/Modal/Modal';
import TitleCard from '../../components/Title/TitleCard';
import { setPageRendering } from '../../redux/pageRendering/PageRenderingAction';
import { EventFundingInfo } from '../../types/eventFunding';
import { PageRender } from '../../types/page';
import { ModalListState } from '../../types/typeGlobal';

const ListEventFunding = () => {
  const [listEventFunding, setListEventFunding] = useState<EventFundingInfo[]>(
    [],
  );
  const [modalState, setModalState] = useState<ModalListState>(
    ModalListState.CLOSE,
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    setModalState(ModalListState.CLOSE);
  };
  const [formAddEvent, setAddEvent] = useState({
    name: '',
    time: '',
    id: '',
    totalAmount: 0,
    description: '',
  });

  const handleChangeAddEvent = (event: any) => {
    setAddEvent({
      ...formAddEvent,
      [event.target.name]: event.target.value,
    });
    console.log(formAddEvent);
  };

  const submitAddEvent = (event: any) => {
    event.preventDefault();

    //call API to add member to db

    setListEventFunding([...listEventFunding, formAddEvent]);

    handleClose();
  };

  useEffect(() => {
    //call api here to get list family
    dispatch(setPageRendering(PageRender.LIST_EVENT));

    setListEventFunding([
      {
        name: 'Thu phí sinh hoạt tổ dân phố',
        totalAmount: 100000000,
        time: '15/10/2021',
        description: 'string',
        id: '1',
      },
      {
        name: 'Đóng góp hội khuyến học',
        totalAmount: 20000000,
        time: '15/10/2021',
        description: 'string',
        id: '1',
      },
      {
        name: 'Ủng hộ hội chữ thập đỏ',
        totalAmount: 100000,
        time: '15/10/2021',
        description: 'string',
        id: '1',
      },
    ]);
  }, []);

  const navigate = useNavigate();

  const renderListEventFunding = (listEventFunding: EventFundingInfo[]) => {
    return listEventFunding.map((eventFunding) => {
      return (
        <EventFundingCard
          key={eventFunding.id}
          name={eventFunding.name}
          totalAmount={eventFunding.totalAmount}
          time={eventFunding.time}
          description={eventFunding.description}
          onClick={() => {
            handleClickEventFundingCard(eventFunding.id);
          }}
        />
      );
    });
  };

  const handleClickEventFundingCard = (eventId: string) => {
    navigate(`/fundingDetail/${eventId}`);
  };

  const handleShowAddEventForm = () => {
    setModalState(ModalListState.ADD_EVENT);
  };
  return (
    <Container>
      <TitleCard title="Danh sách các quỹ đóng góp">
        <AiOutlinePlusCircle
          style={{ margin: '5vh 2vw', cursor: 'pointer' }}
          size={42}
          onClick={handleShowAddEventForm}
        />
        <Modal
          show={modalState === ModalListState.ADD_EVENT}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <ModalContent title="Thêm quỹ" handleClose={handleClose}>
            <FormAddEvent
              handleChangeAddEvent={handleChangeAddEvent}
              submitAddEvent={submitAddEvent}
            ></FormAddEvent>
          </ModalContent>
        </Modal>
      </TitleCard>
      <div className="list-family-container">
        {renderListEventFunding(listEventFunding)}
      </div>
    </Container>
  );
};

export default ListEventFunding;
