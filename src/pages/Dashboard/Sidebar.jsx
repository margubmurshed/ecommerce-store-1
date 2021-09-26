const Sidebar = ({ currentTab, setCurrentTab }) => {

  return (
    <>
      <div
        className={`h-full bg-white overflow-y-auto p-2 dashboard-sidebar`}
        style={{ flex: "0.2" }}
      >
        <div className={`flex justify-start items-center gap-4 px-3 py-5 rounded-md hover:bg-blue-100 hover:text-blue-500 cursor-pointer ${currentTab === 'my-account' && 'bg-blue-100 hover:text-blue-500'}`} onClick={() => setCurrentTab('my-account')}>
          <i className={`far fa-user text-blue-500`}></i>
          <p>My Account</p>
        </div>

        <div className={`flex justify-start items-center gap-4 px-3 py-5 rounded-md hover:bg-blue-100 hover:text-blue-500 cursor-pointer ${currentTab === 'orders' && 'bg-blue-100 hover:text-blue-500'}`} onClick={() => setCurrentTab('orders')}>
          <i className={`fas fa-shopping-cart text-blue-500`}></i>
          <p>My Orders</p>
        </div>

        <div className={`flex justify-start items-center gap-4 px-3 py-5 rounded-md hover:bg-blue-100 hover:text-blue-500 cursor-pointer ${currentTab === 'favorites' && 'bg-blue-100 text-blue-500'}`} onClick={() => setCurrentTab('favorites')}>
          <i className={`far fa-heart text-blue-500`}></i>
          <p>My Favorites</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
