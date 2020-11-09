import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  randomCreatedDate,
  randomUpdatedDate,
} from '@material-ui/x-grid-data-generator';

const rows = [
  {
    id: 1,
    Medication: 'Damien',
    Strength: '25',
    Frequency: 'ONCE daily',
    Time: '9am',
    StartDate: randomCreatedDate(),
    EndDate: randomUpdatedDate(),
  },
  {
    id: 2,
    Medication: 'Nicolas',
    Strength: '36',
    Frequency: 'ONCE daily',
    Time: '9am',
    StartDate: randomCreatedDate(),
    EndDate: randomUpdatedDate(),
  },
  {
    id: 3,
    Medication: 'Kate',
    Strength: '10mg',
    Frequency: 'ONCE daily',
    Time: '9am',
    StartDate: randomCreatedDate(),
    EndDate: randomUpdatedDate(),
  },
];

const Table = () => {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        columns={[
          { field: 'Medication', type: 'string', width: 130 },
          { field: 'Strength', type: 'string', width: 130 },
          { field: 'Frequency', type: 'string', width: 130 },
          { field: 'Time', type: 'string', width: 130 },
          { field: 'StartDate', type: 'dateTime', width: 180 },
          { field: 'EndDate', type: 'dateTime', width: 180 },
        ]}
        rows={rows}
      />
    </div>
  );
}

export default Table;