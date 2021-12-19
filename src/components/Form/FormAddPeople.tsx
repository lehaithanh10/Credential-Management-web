import React from 'react';
import { Button, Form } from 'react-bootstrap';

const FormAddPeople = () => {
  return (
    <div>
      <Form className="add-member-form">
        <Form.Group className="mb-3">
          <Form.Label>Tên</Form.Label>
          <Form.Control placeholder="Tên" name="name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label></Form.Label>
          <Form.Control placeholder="Tên chủ hộ" name="nameOwner" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Số căn cước công dân chủ hộ</Form.Label>
          <Form.Control
            placeholder="Số căn cước công dân chủ hộ"
            name="ownerPersonalId"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Liên hệ</Form.Label>
          <Form.Control placeholder="Số điện thoại chủ hộ" name="contact" />
        </Form.Group>

        <div className="button-add">
          <Button style={{ width: '20%' }} variant="primary" type="submit">
            Thêm
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormAddPeople;
