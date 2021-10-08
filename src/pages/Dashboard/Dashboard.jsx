import { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import MyAccount from './MyAccount';
import Favorites from './Favorites';
import Orders from './Orders';
import useInnerWidth from '../../Hooks/useInnerWidth';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('my-account');
  const width = useInnerWidth();
  useEffect(() => (document.title = "Dashboard | E-commerce"), []);

  const findComponent = () => {
    switch (currentTab) {
      case 'my-account':
        return <MyAccount />
      case 'favorites':
        return <Favorites />
      case 'orders':
        return <Orders />
      default:
        return null
    }
  }

  return (
    <>
      <div className="w-full flex flex-col md:flex-row border" style={{ minHeight: "90vh" }}>
        <Sidebar currentTab={currentTab} width={width} setCurrentTab={setCurrentTab} />
        <div style={{ flex: width >= 768 ? '0.8' : '1' }} className={width >= 768 ? "overflow-y-auto" : ''}>
          {findComponent()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
