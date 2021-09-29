import { useEffect, useState } from 'react';

const useInnerWidth = () => {
    const [width, setWidth] = useState(0);

    const UpdateWidth = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', UpdateWidth);
        return () => window.removeEventListener("resize", UpdateWidth);
    }, [])

    return width;
}

export default useInnerWidth;
