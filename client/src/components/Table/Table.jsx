// React library
import * as React from 'react';

// Material Ui components
import { DataGrid } from '@material-ui/data-grid';

// Custom styles
import { styles } from './Table.style';


// Component
const Table = (props) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <DataGrid
        columns={[
          { field: 'Medication', type: 'string', width: 150 },
          { field: 'Strength', type: 'string', width: 150 },
          { field: 'Frequency', type: 'string', width: 170 },
          { field: 'Time', type: 'string', width: 150 },
          { field: 'StartDate', type: 'dateTime', width: 170 },
          { field: 'EndDate', type: 'dateTime', width: 170 },
        ]}
        rows={props.rows}
      />
    </div>
  );
}

export default Table;