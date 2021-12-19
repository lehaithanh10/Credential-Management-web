import React from 'react';

import './PersonCard.scss';

interface PersonCardProps {
  name: string;
  image: string;
  phoneNumber: string;
  relationship: string;
  job: string;
  status: string;
  onClick: () => void;
}

const PersonCardFamilyMember = (props: PersonCardProps) => {
  return (
    <div className="person-card" onClick={props.onClick}>
      <div className="top">
        <h4 className="name">{props.name}</h4>
        <img className="circle-img" src={props.image} alt="avatar_img" />
      </div>
      <div className="bottom">
        <p className="info">Số điện thoại: {props.phoneNumber}</p>
        <p className="info">Quan hệ với chủ hộ: {props.relationship}</p>
        <p className="info">Nghề nghiệp: {props.job}</p>
        <p className="info">Tình trạng: {props.status}</p>
      </div>
    </div>
  );
};

export default PersonCardFamilyMember;
