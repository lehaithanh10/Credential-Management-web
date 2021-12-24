import React, { useState, useEffect } from "react";
import { Row, Form, Button, Col } from "react-bootstrap";
import moment from "moment";
import './TamVangForm.scss'


const TamVangForm = () => {
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
        bdTamVang: "",
        ktTamVang: "",
        ldTamVang: "",
        dcNoiDen: ""
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
       
        if (!form.noiOHienTai) {
            setError("Vui lòng nhập Nơi ở hiện tại");
            return;
        }

        if (!form.ldTamVang) {
            setError("Vui lòng nhập lý do tạm vắng");
            return;
        }

        if (!form.dcNoiDen) {
            setError("Vui lòng nhập Địa chỉ nơi đến");
            return;
        }

        setSuccess(true);
    };

    return (
        <div className="insert">
            <div className="title">
                <h3>Thông tin đăng ký tạm vắng</h3>
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

                        <Form.Group as={Col} controlId="formGrid">
                            <Form.Label>Tạm vắng từ ngày:</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Chọn ngày bắt đầu"
                                max={today}
                                value={form.bdTamVang}
                            //onChange={(event) => handleChange(event, 2)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGrid">
                            <Form.Label>đến ngày:</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Chọn ngày kết thúc"
                                max={today}
                                value={form.ktTamVang}
                            //onChange={(event) => handleChange(event, 2)}
                            />
                        </Form.Group>

                        
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridAddress">
                        <Form.Label>Lý do tạm vắng:</Form.Label>
                        <Form.Control
                            placeholder="Nhập nội dung lý do tạm vắng"
                            value={form.ldTamVang}
                        //onChange={(event) => handleChange(event, 6)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress">
                        <Form.Label>Địa chỉ nơi đến:</Form.Label>
                        <Form.Control
                            placeholder="Nhập địa chỉ nơi đến"
                            value={form.dcNoiDen}
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

export default TamVangForm;
