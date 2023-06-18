import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import customFetch, { activateMerchant, suspendMerchant } from '../../../utils/http';
import { getCredentials } from '../../../utils/checkAuth';

const MerchantTable = () => {
  const { token } = getCredentials();
  const [currentPage, setCurrentPage] = useState(1);
  const [merchantsData, setMerchantsData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const perPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(Number(page));
  };
  console.log(currentPage);
  useEffect(() => {
    const fetchMerchants = async () => {
      const { data } = await customFetch.get('/fetch-merchants', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: currentPage,
          perPage,
        },
      });

      setTotalRows(data.totalCount);
      setMerchantsData(data.message.merchants);
    };

    fetchMerchants();
  }, [token, currentPage]);

  const columns = [
    { name: 'Ref ID', selector: (row) => row.id },
    { name: 'Company', selector: (row) => row.name },
    { name: 'Role', selector: (row) => row.role },
    { name: 'Username', selector: (row) => row.username },
    { name: 'Status', selector: (row) => row.status },
    {
      name: 'Actions',
      selector: (row) => (
        <div style={{ display: 'flex' }}>
          <Button
            variant="contained"
            style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
            onClick={() => handleSuspend(row.username)}
          >
            Suspend
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
            onClick={() => handleActivate(row.username)}
          >
            Activate
          </Button>
          <Link to={`/dashboard/update/${row.username}`}>
            <Button variant="contained" color="secondary">
              Update
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const handleSuspend = (username) => {
    suspendMerchant(username, token);
  };

  const handleActivate = (username) => {
    activateMerchant(username, token);
  };

  return (
    <Grid item xs={12} sm={12} md={12}>
      <DataTable
        title="merchants"
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={perPage}
        onChangePage={handlePageChange}
        columns={columns}
        data={merchantsData}
        fixedHeader
        highlightOnHover
        subHeaderComponent={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <input type="text" placeholder="Search here" />
          </div>
        }
      />
    </Grid>
  );
};

export default MerchantTable;
