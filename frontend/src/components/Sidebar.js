import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Shield,
  ClipboardList,
  BarChart3,
  MessageCircleCode,
  MapPin,
} from 'lucide-react'; // ✅ Add Building2 icon
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">UrbanSync</h2>
      <nav>
        <NavLink to="/admin" end>
  <LayoutDashboard className="icon" />
  <span className="link-text">Dashboard</span>
</NavLink>
<NavLink to="/admin/users">
  <Users className="icon" />
  <span className="link-text">User Management</span>
</NavLink>
<NavLink to="/admin/roles">
  <Shield className="icon" />
  <span className="link-text">Roles & Permissions</span>
</NavLink>
<NavLink to="/admin/tasks">
  <ClipboardList className="icon" />
  <span className="link-text">Task Assignment</span>
</NavLink>
<NavLink to="/admin/analytics">
  <BarChart3 className="icon" />
  <span className="link-text">Analytics & Reports</span>
</NavLink>
<NavLink to="/admin/polls">
  <MessageCircleCode className="icon" />
  <span className="link-text">Proposal/Poll Manager</span>
</NavLink>
<NavLink to="/admin/heatmap">
  <MapPin className="icon" />
  <span className="link-text">Issue Heatmap</span>
</NavLink>


      </nav>
    </div>
  );
};

export default Sidebar;
