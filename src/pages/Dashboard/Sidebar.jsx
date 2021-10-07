const Sidebar = ({ currentTab, setCurrentTab, width }) => {

  if (width >= 768) {
    return (
      <>
        <div
          className={`h-full bg-white overflow-y-auto p-2`}
          style={{ flex: '0.2' }}
        >

          <div className="flex flex-col gap-2">
            <div className={`p-3 flex gap-2 items-center rounded-md hover:bg-blue-500 hover:text-white transition cursor-pointer ${currentTab === 'my-account' && 'bg-blue-500 text-white'}`} onClick={() => setCurrentTab('my-account')} exact>
              <i className="far fa-user" />
              <span className="font-medium text-sm">Account</span>
            </div>
            <div className={`p-3 flex gap-2 items-center rounded-md hover:bg-blue-500 hover:text-white transition cursor-pointer ${currentTab === 'orders' && 'bg-blue-500 text-white'}`} onClick={() => setCurrentTab('orders')} exact>
              <i className="fas fa-shopping-cart" />
              <span className="font-medium text-sm">Orders</span>
            </div>
            <div className={`p-3 flex gap-2 items-center rounded-md hover:bg-blue-500 hover:text-white transition cursor-pointer ${currentTab === 'favorites' && 'bg-blue-500 text-white'}`} onClick={() => setCurrentTab('favorites')} exact>
              <i className="far fa-heart" />
              <span className="font-medium text-sm">Favorites</span>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="w-full p-3 bg-white flex justify-evenly items-center flex-wrap gap-2">
        <div className={`p-3 flex gap-2 items-center rounded-md hover:bg-blue-500 hover:text-white transition cursor-pointer ${currentTab === 'my-account' && 'bg-blue-500 text-white'}`} onClick={() => setCurrentTab('my-account')} exact>
          <i className="far fa-user" />
          <span className="font-medium text-sm">Account</span>
        </div>
        <div className={`p-3 flex gap-2 items-center rounded-md hover:bg-blue-500 hover:text-white transition cursor-pointer ${currentTab === 'orders' && 'bg-blue-500 text-white'}`} onClick={() => setCurrentTab('orders')} exact>
          <i className="fas fa-shopping-cart" />
          <span className="font-medium text-sm">Orders</span>
        </div>
        <div className={`p-3 flex gap-2 items-center rounded-md hover:bg-blue-500 hover:text-white transition cursor-pointer ${currentTab === 'favorites' && 'bg-blue-500 text-white'}`} onClick={() => setCurrentTab('favorites')} exact>
          <i className="far fa-heart" />
          <span className="font-medium text-sm">Favorites</span>
        </div>
      </div>
    )
  }
};

export default Sidebar;
