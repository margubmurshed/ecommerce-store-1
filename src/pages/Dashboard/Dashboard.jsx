import { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import MyAccount from './MyAccount';
import Favorites from './Favorites';
import Orders from './Orders';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('my-account');
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

  // console.log(findComponent())

  return (
    <>
      <div className="w-full flex border" style={{ height: "90vh" }}>
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div style={{ flex: '0.8' }} className="overflow-y-auto">
          {findComponent()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
