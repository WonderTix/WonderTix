import React from 'react';

const PerformanceTable = () => {
  return (
    <div className="bg-gray-100 border-b border-gray-400 pb-2 mb-4 p-4">
      <div className="flex justify-between mb-3">
          <h1 className="font-bold text-3xl">Performance Report</h1>
      </div>
      <div className="flex justify-between px-20">
          <div className="font-bold">Name</div>
          <div className="font-bold">Type</div>
          <div className="font-bold">General Ledger Code</div>
          <div className="font-bold">Total Instances (Active and Retired)</div>
          <div className="font-bold">Active Instances</div>
          <div className="font-bold">Sort Order</div>
          <div className="font-bold">Active</div>
      </div>
  </div>
  );
};

export default PerformanceTable;
