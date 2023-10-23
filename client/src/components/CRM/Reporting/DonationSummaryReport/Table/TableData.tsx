import React from 'react';

const TableData = () => {
    const origins = [
        {
            title: 'Donation Origin 1',
            data: [
                {campaign: 'Campaign 1', amount: 5},
                {campaign: 'Campaign 2', amount: 10},
            ],
        },
        {
            title: 'Donation Origin 2',
            data: [
                {campaign: 'Campaign 3', amount: 15},
                {campaign: 'Campaign 4', amount: 20},
            ],
        },
        {
            title: 'Donation Origin 3',
            data: [
                {campaign: 'Campaign 5', amount: 15},
                {campaign: 'Campaign 6', amount: 20},
            ],
        },
    ];

    return (
        <div className="px-2 lg:px-2">
            <h1 className="text-2xl font-bold mb-4 px-4">Donation</h1>
            {origins.map((origin, originIndex) => {
                const grossTotal = origin.data.reduce((acc, curr) => acc + curr.amount, 0);
                return (
                    <div key={originIndex} className="mb-3">
                        <table className="min-w-full border-collapse bg-gray-100 border border-gray-300">
                            <thead>
                                <tr>
                                    <th colSpan={2} className="text-xl font-semibold py-2 px-4 text-left border-b border-gray-300">{origin.title}</th>
                                </tr>
                                <tr>
                                    <th className="border px-4 py-2 text-left border-gray-300">Campaigns</th>
                                    <th className="border px-4 py-2 text-left border-gray-300">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {origin.data.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                        <td className="border px-4 py-2 text-left border-gray-300">{item.campaign}</td>
                                        <td className="border px-4 py-2 text-left border-gray-300">${item.amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                                <tr className="font-bold">
                                    <td className="border px-4 py-2 text-left border-gray-300">GROSS TOTAL</td>
                                    <td className="border px-4 py-2 text-left border-gray-300">${grossTotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
};

export default TableData;


