import React, { FC } from 'react';
import './App.css';
import Sidebar from './components/Navbar/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListFamily from './pages/ListFamily/ListFamily';
import FamilyDetail from './pages/FamilyDetail/FamilyDetail';
import PersonDetail from './pages/PersonDetail/PersonDetail';
import ListPeople from './pages/ListPeople/ListPeople';
import ListEventFunding from './pages/ListEventFunding/ListEventFunding';
import EventDetail from './pages/EventDetail/EventDetail';

const App: FC = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/family" element={<ListFamily />}></Route>
        <Route path="/people" element={<ListPeople />}></Route>
        <Route path="/funding" element={<ListEventFunding />}></Route>F
        {/* <Route path="/person" element={<PersonCard />}></Route> */}
        <Route path="/familyDetail/:id" element={<FamilyDetail />}></Route>
        <Route path="/personDetail/:id" element={<PersonDetail />}></Route>
        <Route path="/fundingDetail/:id" element={<EventDetail />}></Route>
        {/* <Route path="/overview/users" component={Users} exact></Route>
        <Route path="/overview/revenue" component={Revenue} exact></Route>
        <Route path="/order" component={Order} exact></Route>
        <Route path="/history" component={History} exact></Route>
        <Route path="/configurations" component={Configurations} exact></Route> */}
      </Routes>
    </Router>
  );
};

export default App;
