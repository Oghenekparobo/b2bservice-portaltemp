import { useEffect, useRef } from 'react';
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';

// Import DataTables CSS
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';

const StyledTableContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const TransactionsTable = () => {
  const tableRef = useRef(null);

  const dummyData = [
    { id: '4d5e6f', name: 'Jane Smith', type: 'Data', transaction: 'Transaction 2', amount: '$2000', status: 'Failed' },
    {
      id: '1a2b3c',
      name: 'John Doe',
      type: 'b2b',
      transaction: 'Transaction 1',
      amount: '$1000',
      status: 'Success',
    },
  ];

  useEffect(() => {
    const table = $(tableRef.current);
    table.DataTable({
      responsive: true,
    });

    return () => {
      // Destroy DataTables instance on unmounting
      table.DataTable().destroy();
    };
  }, []);

  return (
    <StyledTableContainer item xs={12} sm={12} md={12} component={Paper}>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th>Reference ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Transaction</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.type}</td>
              <td>{row.transaction}</td>
              <td>{row.amount}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTableContainer>
  );
};

export default TransactionsTable;
