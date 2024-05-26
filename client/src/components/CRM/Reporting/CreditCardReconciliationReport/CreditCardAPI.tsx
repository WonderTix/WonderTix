import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import BaseTooltip from '@mui/material/Tooltip';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

interface APIEventsComponentProps {
    begin_date: string,
    end_date: string,
}

