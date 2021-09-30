const Sidebar = ({ currentTab, setCurrentTab, width }) => {

  if (width >= 768) {
    return (
      <>
        <div
          className={`h-full bg-white overflow-y-auto p-2`}
          style={{ flex: '0.2' }}
        >
          <div className={`flex justify-start items-center gap-4 px-3 py-5 rounded-md hover:bg-blue-100 hover:text-blue-500 cursor-pointer text-sm lg:text-base ${currentTab === 'my-account' && 'bg-blue-100 hover:text-blue-500'}`} onClick={() => setCurrentTab('my-account')}>
            <i className={`far fa-user text-blue-500`}></i>
            <p>My Account</p>
          </div>

          <div className={`flex justify-start items-center gap-4 px-3 py-5 rounded-md hover:bg-blue-100 hover:text-blue-500 cursor-pointer text-sm lg:text-base ${currentTab === 'orders' && 'bg-blue-100 hover:text-blue-500'}`} onClick={() => setCurrentTab('orders')}>
            <i className={`fas fa-shopping-cart text-blue-500`}></i>
            <p>My Orders</p>
          </div>

          <div className={`flex justify-start items-center gap-4 px-3 py-5 rounded-md hover:bg-blue-100 hover:text-blue-500 cursor-pointer text-sm lg:text-base ${currentTab === 'favorites' && 'bg-blue-100 text-blue-500'}`} onClick={() => setCurrentTab('favorites')}>
            <i className={`far fa-heart text-blue-500`}></i>
            <p>My Favorites</p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="w-full p-3 bg-white flex justify-evenly items-center flex-wrap gap-2">
        <div className={`flex justify-start items-center gap-4 px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-500 cursor-pointer border text-xs ${currentTab === 'my-account' && 'bg-blue-100 hover:text-blue-500'}`} onClick={() => setCurrentTab('my-account')}>
          <i className={`far fa-user text-blue-500`}></i>
          <p>My Account</p>
        </div>

        <div className={`flex justify-start items-center gap-4 px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-500 cursor-pointer border text-xs ${currentTab === 'orders' && 'bg-blue-100 hover:text-blue-500'}`} onClick={() => setCurrentTab('orders')}>
          <i className={`fas fa-shopping-cart text-blue-500`}></i>
          <p>My Orders</p>
        </div>

        <div className={`flex justify-start items-center gap-4 px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-500 cursor-pointer border text-xs ${currentTab === 'favorites' && 'bg-blue-100 text-blue-500'}`} onClick={() => setCurrentTab('favorites')}>
          <i className={`far fa-heart text-blue-500`}></i>
          <p>My Favorites</p>
        </div>
      </div>
    )
  }
};

export default Sidebar;
