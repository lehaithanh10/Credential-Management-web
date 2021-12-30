import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import instance from '../../axiosInstance/axiosInstance';
import TitleCard from '../../components/Title/TitleCard';
import { renderErrorMessage } from '../../helpers';
import { HistoryFamilyInfo } from '../../types/family';

const HistoryFamily = () => {
  const [historyFamily, setHistoryFamily] = useState();
  const [errHistory, setErrHistory] = useState<string[]>();
  const slug = useParams();

  const renderHistoryFamily = (
    historyFamily: HistoryFamilyInfo[] | undefined,
  ) => {
    console.log(historyFamily);
    return historyFamily?.map((history, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{history.date}</td>
          <td>{history.status}</td>
          <td>{history.descriptions} </td>
        </tr>
      );
    });
  };

  const fetchHistoryFamily = async () => {
    console.log(slug);
    const res = await instance.get(`shkHistory/search?idHoKhau=${slug.idSHK}`);

    console.log(res.data);
    if (res.data.status) {
      setHistoryFamily(res.data.response);
      console.log(historyFamily);
    } else {
      setErrHistory([res.data.response]);
    }
  };

  useEffect(() => {
    fetchHistoryFamily();
  });
  return (
    <div>
      <Container>
        <TitleCard title="Lịch sử chỉnh sửa hộ khẩu"></TitleCard>

        {errHistory && renderErrorMessage(errHistory)}

        {!errHistory && (
          <Table responsive="lg" className="mt-2" bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày</th>
                <th>Trạng thái</th>
                <th>Nội dung</th>
              </tr>
            </thead>
            <tbody>{renderHistoryFamily(historyFamily)}</tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default HistoryFamily;
