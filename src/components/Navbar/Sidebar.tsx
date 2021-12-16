import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import Submenu from './Submenu';
import { Button, FormControl, Form } from 'react-bootstrap';
import './Sidebar.scss';
import { FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { PageRender } from '../../types/page';

const SidebarNav = styled.div<{ sidebar: boolean }>`
  width: 260px;
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

const Sidebar: FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const pageRendering: PageRender = useSelector(
    (state: RootState) => state.pageRendering.currentPageRendering,
  );
  const generateSearchSuggestion = (page: PageRender) => {
    switch (page) {
      case PageRender.LIST_CREDENTIAL: {
        return 'Tìm theo tên cư dân';
      }
      case PageRender.LIST_EVENT: {
        return 'Tìm theo tên sự kiện';
      }
      case PageRender.LIST_FAMILY: {
        return 'Tìm theo tên chủ hộ';
      }
      default:
        return 'Tìm kiếm';
    }
  };

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className="my-navbar">
        <NavIcon to="#" onClick={showSidebar}>
          <AiOutlineMenu />
        </NavIcon>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder={generateSearchSuggestion(pageRendering)}
            className="search-field me-2"
            aria-label="Search"
          />
          <Button variant="primary">Tìm</Button>
        </Form>
        <div className="auth-space-wrapper">
          <FaUserAlt />
          <div className="auth-space">Đăng nhập/Đăng ký</div>
        </div>
      </div>

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
