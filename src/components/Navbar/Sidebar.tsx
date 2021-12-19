import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import Submenu from './Submenu';
import { Button, FormControl, Form, Col, Row } from 'react-bootstrap';
import './Sidebar.scss';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { PageRender } from '../../types/page';
import instance from '../../axiosInstance/axiosInstance';
import { setCurrentListFamily } from '../../redux/family/FamilyAction';

const SidebarNav = styled.div<{ sidebar: boolean }>`
  width: 300px;
  height: 100vh;
  background-color: black;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 1;
`;

const NavIcon = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5rem;
  font-size: 2rem;
  margin-left: 2rem;
`;

interface Search {
  cccd: string;
  eventName: string;
  ownerName: string;
}

const Sidebar: FC = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [displayAdvanceSearch, setDisplayAdvanceSearch] =
    useState<boolean>(false);
  const [formSearch, setFormSearch] = useState<Search>({
    cccd: '',
    eventName: '',
    ownerName: '',
  });
  const showSidebar = () => setSidebar(!sidebar);
  const pageRendering: PageRender = useSelector(
    (state: RootState) => state.pageRendering.currentPageRendering,
  );
  const dispatch = useDispatch();
  const generateSearchSuggestion = (page: PageRender) => {
    switch (page) {
      case PageRender.LIST_CREDENTIAL: {
        return 'Tìm theo tên nhân khẩu';
      }
      case PageRender.LIST_EVENT: {
        return 'Tìm theo tên quỹ';
      }
      case PageRender.LIST_FAMILY: {
        return 'Tìm theo căn cước chủ hộ';
      }
      default:
        return 'Tìm kiếm';
    }
  };

  const handleChangeSearchFamily = (event: any) => {
    switch (pageRendering) {
      case PageRender.LIST_CREDENTIAL:
        setFormSearch({ ...formSearch, ownerName: event.target.value });
        break;
      case PageRender.LIST_FAMILY:
        setFormSearch({ ...formSearch, cccd: event.target.value });
        break;

      case PageRender.LIST_EVENT:
        setFormSearch({ ...formSearch, eventName: event.target.value });
        return;
      default:
        return;
    }
  };

  const handleClickSearchFamily = async (event: any) => {
    switch (pageRendering) {
      case PageRender.LIST_CREDENTIAL:
        {
          const res = await instance.get(
            `congDan/search?cccd=${formSearch.ownerName}`,
          );
        }
        break;
      case PageRender.LIST_FAMILY:
        {
          const res = await instance.get(
            `hoKhau/search?cccd=${formSearch.cccd}`,
          );
          console.log(res.data);
          dispatch(setCurrentListFamily(res.data.response));
        }
        break;

      case PageRender.LIST_EVENT:
        // const res = await instance.get('hoKhai');
        return;
      default:
        return;
    }
  };

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className="my-navbar">
        <NavIcon to="#" onClick={showSidebar}>
          <AiOutlineMenu />
        </NavIcon>
        <Form className="">
          <Row className="align-items-center d-flex justify-content-center ml-1">
            <FormControl
              type="search"
              placeholder={generateSearchSuggestion(pageRendering)}
              className="search-field me-2"
              aria-label="Search"
              onChange={handleChangeSearchFamily}
            />
            <Col xs="auto">
              <Button onClick={handleClickSearchFamily} variant="primary">
                Tìm
              </Button>
            </Col>

            {pageRendering === PageRender.LIST_CREDENTIAL && (
              <Col xs="auto">
                <Button
                  type="button"
                  variant="success"
                  onClick={(e) => {
                    setDisplayAdvanceSearch(true);
                    // handleChange(e, [5000000, 20000000]);
                  }}
                >
                  Advanced Search
                </Button>
              </Col>
            )}
          </Row>
        </Form>
        <div className="auth-space-wrapper">
          <FaUserAlt />
          <div className="auth-space">Đăng nhập/Đăng ký</div>
        </div>
      </div>
      {/* {displayAdvanceSearch && (
        <Row className="align-items-center d-flex justify-content-center mr-5">
          <Col sm={3}>
            <Form.Control
              as="select"
              className="mr-sm-2"
              name="category"
              value={'Tạm trú'}
              // onChange={onChangeForm}
            >
              {personStatus.map((status, index) => (
                <option key={index}>{status}</option>
              ))}
            </Form.Control>
          </Col>

          <Col xs="auto">
            <Button
              type="button"
              variant="danger"
              onClick={(e) => {
                setDisplayAdvanceSearch(false);
                // handleChange(e, null);
                // setForm({
                //   ...form,
                //   category: '',
                // });
              }}
            >
              X
            </Button>
          </Col>
        </Row>
      )} */}

      <SidebarNav sidebar={sidebar}>
        <div>
          <NavIcon to="#" onClick={showSidebar}>
            <AiOutlineClose />
          </NavIcon>
          {SidebarData.map((item, index) => {
            return <Submenu item={item} key={index} />;
          })}
        </div>
      </SidebarNav>
    </IconContext.Provider>
  );
};

export default Sidebar;
