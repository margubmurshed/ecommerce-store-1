import React from 'react'

const Summary = ({ cart, total, loading, submitOrder }) => {
    return (
        <div className="checkout-summary flex flex-col bg-white rounded-md shadow-md sticky top-3 p-4 checkout-summary">
            <span className="text-xl font-semibold px-5 py-3 bg-green-100 text-green-800 rounded-md">
                Summary
            </span>
            <div className="mt-4 flex flex-col gap-3">
                {cart.map(({ product, count }) => (
                    <div className="flex justify-between gap-4 w-full" key={Math.random()}>
                        <p className="flex-1 text-sm">
                            {product.name} <br /> <strong>X {count}</strong>
                        </p>
                        <p>Tk. {product.price * count}</p>
                    </div>
                ))}
                <div className="flex justify-between w-full">
                    <p className="flex-1">Shipping</p>
                    <p>Tk. 50</p>
                    <hr />
                </div>
                <div className="flex justify-between w-full">
                    <p className="flex-1">Total</p>
                    <p>Tk. {total}</p>
                    <hr />
                </div>
                <div className="flex justify-between w-full">
                    <p className="font-semibold flex-1">Payable Total</p>
                    <p className="font-semibold">Tk. {total}</p>
                    <hr />
                </div>
                <button
                    className="w-full bg-green-400 text-white p-3 rounded-md"
                    onClick={submitOrder}
                    disabled={loading}
                >
                    Order Now
                </button>
            </div>
        </div>
    )
}

export default Summary
