/* eslint-disable react/react-in-jsx-scope */
import Reporting from './Reporting';
import Navigation from '../Navigation';
import CreditCardReconciliationReport from './CreditCardReconciliationReport/CreditCardReconiliationReport';
import {Box} from '@mui/material';

/**
 * @returns {object} ReportingMain - has Navigation
 *  and Reporting to reroute to other components
 */
const ReportingMain = () => {
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          overflowX: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            marginLeft: '16.7rem',
            marginRight: '4rem',
          }}
        >
          <Box
            sx={{
              marginTop: '6rem',
              marginBottom: '1.5rem',
            }}
          >
            <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500'>
              Reports
            </h1>
            <ul style={{listStyleType: 'disc', marginLeft: '1.5rem'}}>
              <li><a href="/admin/reporting/daily-sales-report">Daily Sales Report</a></li>
              <li><a href="/admin/reporting/donation-summary-report">Donation Summary Report</a></li>
              <li><a href="/admin/reporting/credit-card-reconciliation">Credit Card Reconciliation</a></li>
            </ul>
          </Box>
        </Box>
      </Box>
      <Navigation/>
    </div>
  );
};

export default ReportingMain;
