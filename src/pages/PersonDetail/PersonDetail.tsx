import React from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import '../../assets/img/face-3.jpg';
import './PersonDetail.scss';

const PersonDetail = () => {
  return (
    <>
      <Container>
        <Row className="mb-3">
          <Col md="8" className="form-edit">
            <Card className="card-form-edit md-8">
              <Card.Header>
                <Card.Title className="title" as="h4">
                  Chỉnh sửa thông tin
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Họ</label>
                        <Form.Control
                          placeholder="Họ"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="5">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Tên</label>
                        <Form.Control
                          placeholder="Tên"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Giới tính</label>
                        <Form.Control
                          placeholder="Giới tính"
                          type="text"
                          list="genders"
                        ></Form.Control>
                        <datalist id="genders">
                          <option value="Nam" />
                          <option value="Nữ" />
                          <option value="Khác" />
                        </datalist>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Căn cước công dân</label>
                        <Form.Control
                          placeholder="Căn cước công dân"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Số điện thoại</label>
                        <Form.Control
                          placeholder="Số điện thoại"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Địa chỉ</label>
                        <Form.Control
                          placeholder="Địa chỉ"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Số sổ hộ khẩu</label>
                        <Form.Control
                          placeholder="Số sổ hộ khẩu"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Nghề nghiệp</label>
                        <Form.Control
                          placeholder="Nghề nghiệp"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Quan hệ với chủ hộ</label>
                        <Form.Control
                          placeholder="Quan hệ với chủ hộ"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Tình trạng</label>
                        <Form.Control
                          placeholder="Tình trạng"
                          type="text"
                          list="status"
                        ></Form.Control>
                        <datalist id="status">
                          <option value="Đang ở" />
                          <option value="Đã chuyển đi" />
                          <option value="Qua đời" />
                        </datalist>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">
                          Thời gian chuyển đi/qua đời
                        </label>
                        <Form.Control
                          placeholder="Thời gian chuyển đi/qua đời"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="btn-fill pull-right mt-2"
                    type="submit"
                    variant="info"
                  >
                    Cập nhật thông tin
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <Card.Body>
                <div className="author">
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={require('../../assets/img/face-3.jpg').default}
                  ></img>
                  <h5 className="title">Mike Andrew</h5>
                  <h5 className="title">001201021785</h5>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PersonDetail;
