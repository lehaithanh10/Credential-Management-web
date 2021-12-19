import React from 'react';
import { Button, Form } from 'react-bootstrap';

interface FormAddEventProps {
  handleChangeAddEvent: (event: any) => void;
  submitAddEvent: (event: any) => void;
}

const FormAddEvent = (props: FormAddEventProps) => {
  return (
    <div>
      <div>
        <Form className="add-member-form" onSubmit={props.submitAddEvent}>
          <Form.Group className="mb-3">
            <Form.Label>Tên quỹ</Form.Label>
            <Form.Control
              placeholder="Tên"
              name="name"
              onChange={props.handleChangeAddEvent}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Thời gian thu</Form.Label>
            <Form.Control
              placeholder="Thời gian thu"
              name="time"
              onChange={props.handleChangeAddEvent}
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

export default FormAddEvent;
