import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
// import { styled } from '@mui/material/styles';
import { Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { getCredentials } from '../../../utils/checkAuth';

const MerchantTable = () => {
  const [merchantsData, setMerchantsData] = useState([]);
  const [test, setTest] = useState();
  const tableRef = useRef(null);
  const { token } = getCredentials();

  console.log(test);
  console.log(merchantsData);

  useEffect(() => {
    let table;

    if (tableRef.current) {
      table = $(tableRef.current).DataTable({
        responsive: true,
        searching: true,
        paging: true,
        ordering: true,
        processing: true,
        serverSide: true,
        scrollX: true,
        ajax: {
          url: 'http://141.144.237.21:3000/fetch-merchants',
          type: 'GET',
          dataSrc(response) {
            const responseBody = response.data;
            const { totalCount } = responseBody.totalCount;

            response.recordsTotal = totalCount;
            response.recordsFiltered = totalCount;

            setTest(totalCount);
            setMerchantsData(responseBody.merchants);

            return responseBody.merchants;
          },

          beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
          },
        },
        columns: [
          { data: 'id' },
          { data: 'username' },
          { data: 'role' },
          { data: 'created' },
          { data: 'status' },
          { data: null },
        ],
      });
    }

    return () => {
      if (table) {
        table.destroy();
      }
    };
  }, [token]);

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
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {merchantsData.map((merch) => (
                <TableRow key={merch.id}>
                  <TableCell>{merch.id}</TableCell>
                  <TableCell>{merch.username}</TableCell>
                  <TableCell>{merch.role}</TableCell>
                  <TableCell>{merch.created}</TableCell>
                  <TableCell>{merch.status}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex' }}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
                        onClick={() => handleSuspend(merch.id)}
                      >
                        Suspend
                      </Button>
                      <Link to={`/dashboard/update/${merch.username}`}>
                        <Button variant="contained" color="secondary" onClick={() => handleUpdate(merch.id)}>
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
