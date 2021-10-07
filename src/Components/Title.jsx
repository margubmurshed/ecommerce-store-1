import React from 'react'

const Title = ({ className, children }) => {
    return (
        <h2 className={`${className} text-xl font-semibold`}>{children}</h2>
    )
}

export default Title
