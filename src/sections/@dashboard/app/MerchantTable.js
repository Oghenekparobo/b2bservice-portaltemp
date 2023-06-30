import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import customFetch from '../../../utils/http';

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

const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
});

const SearchInput = styled('input')({
  flex: 1,
  padding: '8px',
  marginRight: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
});
const MerchantTable = () => {
  const [merchantsData, setMerchantsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMerchants = async (page) => {
    setLoading(true);
    const { data } = await customFetch.get(`/fetch-merchants?page=${page}&perPage=${perPage}`);
    // console.log(data);
    setMerchantsData(data.message.merchants);
    // setTotalRows(data.message.totalCount);
    setTotalRows(30);
    setLoading(false);
  };

  useEffect(() => {
    fetchMerchants(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageChange = (page) => {
    // console.log('page', page);
    setCurrentPage(page);
    fetchMerchants(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    fetchMerchants(page);
  };

  // console.log(currentPage);

  const handleSearch = async () => {
    if (searchValue !== '') {
      try {
        const username = searchValue;
        setLoading(true);
        const data = await customFetch.post('/find-merchant', { username });
        setMerchantsData([data?.data?.message]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMerchantsData([]);
      }
    }
  };

  const handleSuspend = async (username) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const data = await customFetch.put('/suspend-merchant', username);
      fetchMerchants(currentPage);
    } catch (error) {
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
      // eslint-disable-next-line no-unused-vars
      const data = await customFetch.put('/activate-merchant', username);
      fetchMerchants(currentPage);
    } catch (error) {
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
          <SearchContainer>
            <SearchInput type="text" placeholder="Username" onChange={(e) => setSearchValue(e.target.value)} />
            <Button variant="contained" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleSearch}>
              Search
            </Button>
          </SearchContainer>

          <DataTable
            columns={columns}
            data={merchantsData}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            // highlightOnHover
            // customStyles={{
            //   tableWrapper: {
            //     overflowX: 'auto',
            //     overflowY: 'auto',
            //     padding: '10px',
            //   },
            //   tableWrapperOverflow: {
            //     overflow: 'visible',
            //   },
            //   headRow: {
            //     style: {
            //       background: 'Crimson',
            //     },
            //   },
            //   headCells: {
            //     style: {
            //       color: 'white',
            //       fontWeight: 'bold',
            //       paddingTop: '10px',
            //     },
            //   },
            //   rows: {
            //     style: {
            //       borderBottom: '1px solid #ddd',
            //     },
            //   },
            //   cells: {
            //     style: {
            //       padding: '10px',
            //     },
            //   },
            // }}
          />
        </>
      )}
    </Grid>
  );
};

export default MerchantTable;
