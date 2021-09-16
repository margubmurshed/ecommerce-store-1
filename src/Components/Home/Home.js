import { useEffect } from 'react';
import Products from './Products';
import SearchBar from './SearchBar';

const Home = () => {
    console.log("Home Component Render")
    useEffect(() => document.title="Home | E-commerce", [])
    return (
        <>
            <div className="bg-gray-200 py-10" style={{ minHeight: '100vh' }}>
                <div className="flex justify-center flex-col max-w-screen-xl m-auto">
                    <h2 className="text-center text-2xl md:text-4xl font-semibold mb-3">
                        Welcome To <span className="text-blue-500">My Shop</span>
                    </h2>
                    <SearchBar />
                    <Products />
                </div>
            </div>
        </>
    )
}

export default Home;
