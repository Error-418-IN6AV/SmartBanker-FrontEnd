import React from 'react'

export const DepositTable = ({ noCuenta, amount, date }) => {
    return (
        <>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{noCuenta}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{amount}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ new Date(date).toLocaleString()}</td>
        </>
    )
}
