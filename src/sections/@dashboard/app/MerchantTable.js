import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import { Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const MerchantTable = () => {
  function generateId() {
    return uuidv4();
  }

  const tableRef = useRef(null);
  const companyData = [
    {
      id: generateId(),
      companyName: 'Company A',
      username: 'user1',
      status: 'Active',
      createdBy: 'John Doe',
      type: 'Merchant',
    },
    {
      id: generateId(),
      companyName: 'Company B',
      username: 'user2',
      status: 'Inactive',
      createdBy: 'Jane Smith',
      type: 'Sub Merchant',
    },
    // Add more company objects here...
  ];
  useEffect(() => {
    let table;

    if (tableRef.current) {
      table = $(tableRef.current).DataTable({
        paging: true,
        searching: true,
        // Customize pagination settings here
        lengthMenu: [10, 25, 50],
        pageLength: 10,
      });
    }

    return () => {
      if (table) {
        table.destroy();
      }
    };
  }, []);

  const handleSuspend = (id) => {
    // Suspend logic
  };

  const handleUpdate = (id) => {
    // Update logic
  };

  return (
    <Grid item xs={12} sm={12} md={12}>
      <div style={{ overflowX: 'auto' }}>
        <TableContainer component={Paper}>
          <Table ref={tableRef} id="merchantTable">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companyData.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.id}</TableCell>
                  <TableCell>{company.companyName}</TableCell>
                  <TableCell>{company.username}</TableCell>
                  <TableCell>{company.status}</TableCell>
                  <TableCell>{company.createdBy === 'super-admin' ? 'Super Admin' : 'Merchant'}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex' }}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
                        onClick={() => handleSuspend(company.id)}
                      >
                        Suspend
                      </Button>
                      <Link to={`/dashboard/update/${company.username}`}>
                        {' '}
                        <Button variant="contained" color="secondary" onClick={() => handleUpdate(company.id)}>
                          Update
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Grid>
  );
};

export default MerchantTable;
