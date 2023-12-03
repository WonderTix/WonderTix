import React from 'react';

const TableHeader = () => {
    return (
        <div className="bg-gray-100 border-b border-gray-400 pb-2 mb-4 p-4">
            <div className="flex justify-between mb-3">
                <h1 className="font-bold text-3xl">Performance Report</h1>
                <div>
                    <button className="mr-2 bg-blue-500 text-white py-1 px-3 rounded">Export To Excel</button>
                    <button className="bg-green-500 text-white py-1 px-3 rounded">Schedule Future Run</button>
                </div>
            </div>
            <div className="flex justify-between px-20">
                <div className="font-bold">Organization:</div>
                <div className="font-bold">Date Range:</div>
                <div className="font-bold">Group by:</div>
            </div>
        </div>
    );
};

export default TableHeader;

