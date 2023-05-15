import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import {
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const SubMerchant = () => {
  function generateId() {
    return uuidv4();
  }

  const tableRef = useRef(null);
  const subMerchantData = [
    {
      id: generateId(),
      username: 'sub_merchant1',
    },
    {
      id: generateId(),
      username: 'sub_merchant2',
    },
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

  const handleUpdate = (id) => {
    // Update logic
    console.log(`Update sub-merchant with ID: ${id}`);
  };

  const handleSuspend = (id) => {
    // Suspend logic
    console.log(`Suspend sub-merchant with ID: ${id}`);
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 1 }}>
        SUB-MERCHANTS
      </Typography>

      <Card sx={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '500px', padding: '4rem' }}>
        <Grid item xs={12} sm={12} md={12}>
          <div style={{ overflowX: 'auto' }}>
            <TableContainer component={Paper}>
              <Table ref={tableRef} id="SubMerchant">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subMerchantData.map((subMerchant) => (
                    <TableRow key={subMerchant.id}>
                      <TableCell>{subMerchant.id}</TableCell>
                      <TableCell>{subMerchant.username}</TableCell>
                      <TableCell>
                        <div style={{ display: 'flex' }}>
                          <Link to={`/dashboard/update/${subMerchant.username}`}>
                            <Button variant="contained" color="primary" onClick={() => handleUpdate(subMerchant.id)}>
                              Update
                            </Button>
                          </Link>

                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginLeft: '10px', backgroundColor: 'red' }}
                            onClick={() => handleSuspend(subMerchant.id)}
                          >
                            Suspend
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Card>
    </>
  );
};

export default SubMerchant;
