import React, {useState, useEffect} from 'react';
import FilterRange from './FilterRange';
import {SpinAnimation} from '../../../Tasks/SVGIcons';

interface FilterReportProps {
    onGenerateClick: (beginDate: string, endDate: string) => void;
}

const FilterReports: React.FC<FilterReportProps> = ({
    onGenerateClick,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const formatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}${year}`;
        };
    });

    const handleDateChange = (dateString: string, isStartDate: boolean) => {
        const [year, month, day] = dateString.split('-').map(Number);
        const formattedDate = `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${year}`;
        if (isStartDate) {
          setBeginDate(formattedDate);
        } else {
          setEndDate(formattedDate);
        }
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          onGenerateClick(beginDate, endDate);
        }, 1000);
      };


    return (
        <form onSubmit={handleSubmit} className='group mr-2'>
            <div className='flex-grow-1 shadow-xl text-lg rounded-md bg-white border-t-4 border-black w-80'>
                <h1 className='font-bold p-3 border-b text-2xl text-center bg-slate-100'>
                    Filter Settings
                </h1>
                <FilterRange
                    onBeginDateChange={(date) => handleDateChange(date, true)}
                    onEndDateChange={(date) => handleDateChange(date, false)}
                />
                <div className='flex justify-evenly mx-auto border-t my-3 py-4'>
                    <button
                        type='submit'
                        title='Generate'
                        className='flex justify-center items-center
                        rounded py-2.5 px-6 w-32 uppercase bg-black
                        font-bold text-center text-white text-sm
                        bg-gradient-to-t from-black to-gray-800
                        hover:bg-gradient-to-b hover:shadow-inner
                        shadow shadow-gray-600 active:opacity-75
                        group-invalid:pointer-events-none group-invalid:opacity-50'
                    >
                        {isLoading ? <SpinAnimation /> : 'Generate'}
                    </button>
                </div>
            </div>
        </form>
    );
};
export default FilterReports;
