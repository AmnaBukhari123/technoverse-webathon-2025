import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing_page';
import Login from './pages/login';
import DashboardScreen from './pages/citizen_dashboard';
import ReportIssueForm from './components/ReportIssueForm';
import UserManagement from './pages/UserManagement';
import RolePermissions from './pages/RolePermissions';
import TaskAssignment from './pages/TaskAssignment';
import AnalyticsReports from './pages/AnalyticsReport';
import ProposalPolls from './pages/ProposalPolls';
import IssueMonitoring from './pages/IssueMonitoring';
import AdminHome from './pages/AdminHome';
import AdminLayout from './pages/AdminLayout';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Project from './pages/ProjectStatus';
import Resources from './pages/Resources';
import IssueManagement from './pages/IssueManagment';
import Chat from './pages/Internalchat';
import DepartmentLayout from './pages/DepartmentLayout';
import Signup from './pages/signup'; // Adjust the path if needed


function App() {
  return (
    <Router>
      <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} /> {/* <-- Add this line */}
  <Route path="/dashboard" element={<DashboardScreen />} />
  <Route path="/dashboard/issues" element={<ReportIssueForm />} />

  {/* Admin layout with nested routes */}
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminHome />} />
    <Route path="users" element={<UserManagement />} />
    <Route path="roles" element={<RolePermissions />} />
    <Route path="tasks" element={<TaskAssignment />} />
    <Route path="analytics" element={<AnalyticsReports />} />
    <Route path="polls" element={<ProposalPolls />} />
    <Route path="heatmap" element={<IssueMonitoring />} />
  </Route>

  <Route path="/department" element={<DepartmentLayout />}>
    <Route index element={<Home />} />
    <Route path="home" element={<Home />} />
    <Route path="reports" element={<Reports />} />
    <Route path="project-status" element={<Project />} />
    <Route path="resources" element={<Resources />} />
    <Route path="issue-management" element={<IssueManagement />} />
    <Route path="internal-chat" element={<Chat />} />
    {/* <Route path="ar-field-assistance" element={<ARAssist />} /> */}
  </Route>
</Routes>

    </Router>
  );
}

export default App;