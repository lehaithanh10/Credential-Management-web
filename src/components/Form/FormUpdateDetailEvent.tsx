import React from 'react';
import { Button, Form } from 'react-bootstrap';

interface FormUpdateDetailEventProps {
  handleUpdateEvent: (event: any) => void;
  submitUpdatevent: (event: any) => void;
}

const FormUpdateDetailEvent = (props: FormUpdateDetailEventProps) => {
  return (
    <div>
      <div>
        <Form className="add-member-form" onSubmit={props.submitUpdatevent}>
          <Form.Group className="mb-3">
            <Form.Label>Tên chủ hộ</Form.Label>
            <Form.Control
              placeholder="Tên chủ hộ"
              name="owner"
              onChange={props.handleUpdateEvent}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ hộ</Form.Label>
            <Form.Control
              placeholder="Địa chỉ hộ"
              name="address"
              onChange={props.handleUpdateEvent}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số tiền thu (VND)</Form.Label>
            <Form.Control
              placeholder="Số tiền thu"
              name="amount"
              onChange={props.handleUpdateEvent}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Thời gian thu</Form.Label>
            <Form.Control
              placeholder="Thời gian thu"
              name="time"
              onChange={props.handleUpdateEvent}
            />
          </Form.Group>

          <div className="button-add">
            <Button style={{ width: '20%' }} variant="primary" type="submit">
              Thêm
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormUpdateDetailEvent;
