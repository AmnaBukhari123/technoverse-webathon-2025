import React from 'react';
import Sidebar from '../components/d_Sidebar'; // you can reuse or create a new sidebar
import { Outlet } from 'react-router-dom';

const DepartmentLayout = () => {
  return (
    <div className="department-layout" style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DepartmentLayout;
