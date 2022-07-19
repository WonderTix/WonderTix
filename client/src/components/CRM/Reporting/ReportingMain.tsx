/* eslint-disable react/react-in-jsx-scope */
import Reporting from './Reporting';
import Navigation from '../Navigation';


const ReportingMain=() =>{
  return (
    <div className='flex flex-row  '>
      <Reporting/>
      <Navigation icon={undefined}/>
    </div>
  );
};

export default ReportingMain;
