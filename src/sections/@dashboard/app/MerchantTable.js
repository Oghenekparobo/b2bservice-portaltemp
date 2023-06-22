import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import customFetch, { activateMerchant } from '../../../utils/http';

const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const LoadingMessage = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: 24,
  animation: `${theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  })} blink 1s infinite`,
}));

const StyledInput = styled('input')({
  width: '100%',
  padding: '10px',
  marginTop: '10px',
  marginBottom: '10px',
  boxSizing: 'border-box',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
});

const MerchantTable = () => {
  const [merchantsData, setMerchantsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  console.log(merchantsData, totalRows);

  const fetchMerchants = async (page, newPerPage) => {
    setLoading(true);
    const { data } = await customFetch.get(`/fetch-merchants?page=${page}&perPage=${newPerPage}`);
    setMerchantsData(data.message.merchants);
    setTotalRows(data.message.totalCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchMerchants(page, perPage);
  }, [page, perPage]);

  const handlePageChange = (page) => {
    fetchMerchants(page, perPage);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchMerchants(page, newPerPage);
  };

  const handleSort = (e) => {
    const searchQuery = e.target.value;
    if (searchQuery !== '') {
      const newMerchantsData = merchantsData.filter((merchant) => merchant.username.includes(searchQuery));
      setMerchantsData(newMerchantsData);
    } else {
      setMerchantsData([...merchantsData]);
    }
  };

  const handleSuspend = async (username) => {
    try {
      const data = await customFetch.put('/suspend-merchant', username);
      fetchMerchants(page, perPage);
    } catch (error) {
      console.log(error.message);
      toast.error('Operation Failed', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: 'light',
      });
    }
  };

  const handleActivate = async (username) => {
    try {
      const { data } = await customFetch.put('/activate-merchant', username);

      console.log(data);
      fetchMerchants(page, perPage);
    } catch (error) {
      console.log(error.message);
      toast.error('Operation Failed', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: 'light',
      });
    }
  };

  const columns = [
    { name: 'COMPANY', selector: (row) => row.name },
    { name: 'ROLE', selector: (row) => row.role },
    { name: 'USERNAME', selector: (row) => row.username },
    { name: 'STATUS', selector: (row) => row.status },
    {
      name: 'ACTIONS',
      selector: (row) => (
        <div>
          {row.status === 'ACTIVE' ? (
            <Button
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
              onClick={() => {
                Swal.fire({
                  title: 'Are you sure?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, Suspend  Merchant',
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire(`${row.username} Has been suspended`);

                    handleSuspend({ username: row.username });
                  }
                });
              }}
            >
              Suspend
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
              onClick={() => handleActivate({ username: row.username })}
            >
              Activate
            </Button>
          )}
        </div>
      ),
    },
    {
      name: 'UPDATE',
      selector: (row) => (
        <div style={{ display: 'flex' }}>
          <Link to={`/dashboard/update/${row.username}`}>
            <Button variant="contained" color="secondary">
              Update
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Grid item xs={12} sm={12} md={12}>
      {loading ? (
        <LoadingContainer>
          <CircularProgress size={50} />
          <LoadingMessage variant="h6">Fetching Merchants....</LoadingMessage>
        </LoadingContainer>
      ) : (
        <>
          <StyledInput type="text" placeholder="Search Merchants" onChange={handleSort} />
          <DataTable
            data={merchantsData && merchantsData}
            columns={columns}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover
            customStyles={{
              tableWrapper: {
                overflowX: 'auto',
                overflowY: 'auto',
                padding: '10px',
              },
              tableWrapperOverflow: {
                overflow: 'visible',
              },
              headRow: {
                style: {
                  background: 'Crimson',
                },
              },
              headCells: {
                style: {
                  color: 'white',
                  fontWeight: 'bold',
                  paddingTop: '10px',
                },
              },
              rows: {
                style: {
                  borderBottom: '1px solid #ddd',
                },
              },
              cells: {
                style: {
                  padding: '10px',
                },
              },
            }}
          />
        </>
      )}
    </Grid>
  );
};

export default MerchantTable;
