import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Box,
  Bell,
  MessageCircle,
  MapPin,
} from 'lucide-react'; // Import necessary icons
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">UrbanSync</h2>
      <nav>
        <NavLink to="/department/home" end>
  <LayoutDashboard className="icon" />
  <span className="link-text">Home</span>
</NavLink>
<NavLink to="/department/reports">
  <FileText className="icon" />
  <span className="link-text">Reports</span>
</NavLink>
<NavLink to="/department/project-status">
  <ClipboardList className="icon" />
  <span className="link-text">Project Status</span>
</NavLink>
<NavLink to="/department/resources">
  <Box className="icon" />
  <span className="link-text">Resources</span>
</NavLink>
<NavLink to="/department/issue-management">
  <Bell className="icon" />
  <span className="link-text">Issue Management</span>
</NavLink>
<NavLink to="/department/internal-chat">
  <MessageCircle className="icon" />
  <span className="link-text">Internal Chat</span>
</NavLink>
<NavLink to="/department/ar-field-assistance">
  {/* <MapPin className="icon" /> */}
  {/* <span className="link-text">AR Field Assistance</span> */}
</NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;
