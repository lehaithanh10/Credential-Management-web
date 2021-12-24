import React, { useState, useEffect } from "react";
import { Row, Form, Button, Col } from "react-bootstrap";
import moment from "moment";
import './TamTruForm.scss'


const TamTruForm = () => {
  const [today, setToday] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [form, setForm] = useState({
    hoTen: "",
    cccd: "",
    sdt: "",
    gioiTinh: true,
    ngaySinh: "",
    queQuan: "",
    thuongTru: "",
    tamTru: "",
    noiOHienTai: "",
    tenChuHo: "",
    qhChuHo: "",
    cccdChuHo: "",
    ndDeNghi: "",
    tonGiao: "",
    vanHoa: null,
    ngheNghiep: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log({ today });
    return () => { };
  }, []);

  const handleSubmit = () => {
    setError("");
    console.log({ form });
    if (!form.hoTen) {
      setError("Vui lòng nhập Họ tên");
      return;
    }
    if (!form.ngaySinh) {
      setError("Vui lòng nhập Ngày sinh");
      return;
    }
    if (!form.cccd) {
      setError("Vui lòng nhập số CCCD/CMND");
      return;
    }
    if (!form.queQuan) {
      setError("Vui lòng nhập Quê quán");
      return;
    }
    if (!form.thuongTru) {
      setError("Vui lòng nhập Địa chỉ thường trú");
      return;
    }
    if (!form.tamTru) {
      setError("Vui lòng nhập Địa chỉ tạm trú");
      return;
    }
    if (!form.tonGiao) {
      setError("Vui lòng nhập Tôn giáo");
      return;
    }
    if (!form.vanHoa) {
      setError("Vui lòng chọn Trình độ học vấn");
      return;
    }

    if (!form.ngheNghiep) {
      setError("Vui lòng nhập Nghề nghiệp");
      return;
    }

    if (!form.tenChuHo) {
      setError("Vui lòng nhập họ và tên chủ hộ");
      return;
    }

    if (!form.cccdChuHo) {
      setError("Vui lòng nhập Căn cước công dân của chủ hộ");
      return;
    }

    if (!form.qhChuHo) {
      setError("Vui lòng nhập quan hệ với chủ hộ");
      return;
    }

    if (!form.ngheNghiep) {
      setError("Vui lòng nhập Nghề nghiệp");
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="insert">
      <div className="title">
        <h3>Thông tin đăng ký tạm trú</h3>
      </div>
      <div className="content">
        <Form className="mb-3">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Họ và tên:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                value={form.hoTen}
              //onChange={(event) => handleChange(event, 1)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGrid">
              <Form.Label>Ngày sinh:</Form.Label>
              <Form.Control
                type="date"
                placeholder="Chọn ngày sinh"
                max={today}
                value={form.ngaySinh}
              //onChange={(event) => handleChange(event, 2)}
              />
            </Form.Group>

            <Row as={Col}>
              <Form.Label>Giới tính:</Form.Label>
              <Form.Group as={Col} className="mb-3" id="formGridMale">
                <Form.Check
                  type="checkbox"
                  label="Nam"
                  defaultChecked={form.gioiTinh}
                  //value={form.gioiTinh}
                  onClick={(e) =>
                    setForm({ ...form, gioiTinh: !form.gioiTinh })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" id="formGridFemale">
                <Form.Check
                  type="checkbox"
                  label="Nữ"
                  defaultChecked={!form.gioiTinh}
                  //value={!form.gioiTinh}
                  onClick={(e) =>
                    setForm({ ...form, gioiTinh: !form.gioiTinh })
                  }
                />
              </Form.Group>
            </Row>
          </Row>

          <Form.Group className="mb-3" controlId="formGridID">
            <Form.Label>Số CMND/CCCD:</Form.Label>
            <Form.Control
              placeholder="Nhập số CMND/CCCD"
              value={form.cccd}
            //onChange={(event) => handleChange(event, 3)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridID">
            <Form.Label>Số điện thoại liên hệ</Form.Label>
            <Form.Control
              placeholder="Nhập số điện thoại (nếu có)"
              value={form.sdt}
            //onChange={(event) => handleChange(event, 3)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPlace">
              <Form.Label>Tôn giáo:</Form.Label>
              <Form.Control
                placeholder="Nhập tôn giáo"
                value={form.tonGiao}
              //onChange={(event) => handleChange(event, 7)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>Trình độ văn hóa:</Form.Label>
              <Form.Select
                aria-label="Default select example"
              // value={form.vanHoa}
              // onChange={handleSelected}
              >
                <option>Chọn</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>Nghề nghiệp:</Form.Label>
              <Form.Control
                placeholder="Nhập nghề nghiệp"
                value={form.ngheNghiep}
              //onChange={(event) => handleChange(event, 8)}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridPlace">
            <Form.Label>Quê quán</Form.Label>
            <Form.Control
              placeholder="Nhập quê quán"
              value={form.queQuan}
            //onChange={(event) => handleChange(event, 4)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Địa chỉ thường trú</Form.Label>
            <Form.Control
              placeholder="Nhập địa chỉ thường trú"
              value={form.thuongTru}
            //onChange={(event) => handleChange(event, 5)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Địa chỉ tạm trú</Form.Label>
            <Form.Control
              placeholder="Nhập địa chỉ tạm trú"
              value={form.tamTru}
            //onChange={(event) => handleChange(event, 6)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Nơi ở hiện tại</Form.Label>
            <Form.Control
              placeholder="Nhập địa chỉ nơi ở hiện tại"
              value={form.noiOHienTai}
            //onChange={(event) => handleChange(event, 6)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as = {Col} controlId="formGridAddress">
              <Form.Label>Họ và tên chủ hộ</Form.Label>
              <Form.Control
                placeholder="Nhập họ và tên chủ hộ"
                value={form.tenChuHo}
              //onChange={(event) => handleChange(event, 6)}
              />
            </Form.Group>

            <Form.Group as = {Col} controlId="formGridAddress">
              <Form.Label>Quan hệ với chủ hộ</Form.Label>
              <Form.Control
                placeholder="Nhập quan hệ với chủ hộ"
                value={form.qhChuHo}
              //onChange={(event) => handleChange(event, 6)}
              />
            </Form.Group>

            <Form.Group as = {Col} controlId="formGridAddress">
              <Form.Label>Số CMND của chủ hộ</Form.Label>
              <Form.Control
                placeholder="Nhập số cmnd của chủ hộ"
                value={form.cccdChuHo}
              //onChange={(event) => handleChange(event, 6)}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Nội dung đề nghị đăng ký tạm trú</Form.Label>
            <Form.Control
              placeholder="Nhập nội dung đề nghị"
              value={form.ndDeNghi}
            //onChange={(event) => handleChange(event, 6)}
            />
          </Form.Group>

          {error ? (
            <Form.Group className="mb-3">
              <Form.Text className="text-danger">{error}</Form.Text>
            </Form.Group>
          ) : null}

          <Button
            variant="primary"
            //type={success ? "submit" : null}
            onClick={handleSubmit}
          >
            Gửi
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default TamTruForm;
