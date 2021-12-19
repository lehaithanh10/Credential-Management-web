import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import TitleCard from '../../components/Title/TitleCard';
import { EventFundingInfo, FamilyFundingInfo } from '../../types/eventFunding';

const EventDetail = () => {
  const [eventFunding, setEventFunding] = useState<EventFundingInfo>();

  const renderContributeEventFunding = (
    eventFundingListFamily: FamilyFundingInfo[] | undefined,
  ) => {
    return eventFundingListFamily?.map((family, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{family.nameOnwer}</td>
          <td>{family.address}</td>
          <td>{family.amount}</td>
        </tr>
      );
    });
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
          nameOnwer: 'Le Hai Thanh',
          amount: 1,
        },
        {
          address: '39 Dich Vong Cau Giay',
          nameOnwer: 'Le Hai Thanh',
          amount: 1,
        },
        {
          address: '39 Dich Vong Cau Giay',
          nameOnwer: 'Le Hai Thanh',
          amount: 1,
        },
        {
          address: '39 Dich Vong Cau Giay',
          nameOnwer: 'Le Hai Thanh',
          amount: 1,
        },
      ],
    };

    setEventFunding(eventFunding);
  });

  return (
    <div>
      <Container>
        <TitleCard title="Chi tiết quỹ đã thu"></TitleCard>
        <Table responsive="lg" className="mt-2" bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên chủ hộ</th>
              <th>Địa chỉ hộ</th>
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
              <td colSpan={3} style={{ textAlign: 'center' }}>
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
