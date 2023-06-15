import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';

import { Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { activateMerchant, suspendMerchant } from '../../../utils/http';
import { getCredentials } from '../../../utils/checkAuth';

const MerchantTable = () => {
  const [merchantsData, setMerchantsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tableRef = useRef(null);
  const { token } = getCredentials();

  console.log(merchantsData);

  if (isLoading) {
    console.log('true');
  } else {
    console.log('false');
  }

  useEffect(() => {
    let table;

    if (tableRef.current) {
      table = $(tableRef.current).DataTable({
        serverSide: true,
        processing: true,
        paging: true,
        ajax: {
          url: 'http://141.144.237.21:3000/fetch-merchants',
          type: 'GET',
          data(param) {
            const { start } = param;
            const { length } = param;
            param.perPage = length;
            param.page = Math.floor(start / length) + 1;
            return param;
          },
          dataSrc(response) {
            const { totalCount } = response;
            response.recordsTotal = totalCount;
            response.recordsFiltered = totalCount;

            response.data = response.message.merchants;
            setIsLoading(true);
            setMerchantsData(response.data);
            setIsLoading(false);
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

  const handleSuspend = (username) => {
    suspendMerchant(username, token);
  };
  const handleActivate = (username) => {
    activateMerchant(username, token);
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
              {!isLoading &&
                merchantsData.length > 0 &&
                merchantsData.map((merch) => (
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
                          onClick={() => handleSuspend(merch.username)}
                        >
                          Suspend
                        </Button>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
                          onClick={() => handleActivate(merch.username)}
                        >
                          Activate
                        </Button>
                        <Link to={`/dashboard/update/${merch.username}`}>
                          <Button variant="contained" color="secondary">
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
