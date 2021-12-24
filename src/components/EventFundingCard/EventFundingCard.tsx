import React from 'react';
import {
  BsTelephoneFill,
  BsFillHouseFill,
  BsFillPeopleFill,
  BsFillPersonFill,
} from 'react-icons/bs';
import { FaMoneyBillWave } from 'react-icons/fa';
import { GrMoney } from 'react-icons/gr';
import { RiTimerFill } from 'react-icons/ri';

import './EventFundingCard.scss';

interface EventFundingCardProps {
  key: string;
  name: string;
  totalAmount: number;
  time: string;
  description: string;
  onClick: (event: any) => void;
}

const EventFundingCard = (props: EventFundingCardProps) => {
  return (
    <div className="card" onClick={props.onClick} key={props.key}>
      <div className="card-header">
        <div>
          <div className="card-title-group">
            <div className="card-title">
              <GrMoney />
              <div className="card-content">Tên quỹ : {props.name}</div>
            </div>
            <div className="card-title">
              <RiTimerFill />
              <div className="card-content">Thời gian thu : {props.time}</div>
            </div>
            <div className="card-title">
              <FaMoneyBillWave />
              <div className="card-content">
                Tổng số tiền : {props.totalAmount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFundingCard;
