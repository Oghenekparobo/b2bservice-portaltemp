import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useQuery } from '@tanstack/react-query';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import customFetch, { useActionMerchant } from '../../../utils/http';
import { getCredentials } from '../../../utils/checkAuth';

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
  const { actionMerchant } = useActionMerchant();
  const { token } = getCredentials();
  const [page, setPage] = useState(1);
  const [merchantsData, setMerchantsData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const perPage = 20;

  const { isLoading, data } = useQuery({
    queryKey: ['fetch-merchants'],
    queryFn: async () => {
      const { data } = await customFetch.get('/fetch-merchants', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          perPage,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      setMerchantsData(data.message.merchants);
    },
  });

  console.log(data, merchantsData);

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
                const confirmSuspension = window.confirm('Are you sure you want to suspend this merchant?');
                if (confirmSuspension) {
                  actionMerchant({ username: row.username, token, type: 'suspend' });
                }
              }}
            >
              Suspend
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
              onClick={() => actionMerchant({ username: row.username, token, type: 'activate' })}
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

  const handlePageChange = (page) => {
    setPage(page);
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

  return (
    <Grid item xs={12} sm={12} md={12}>
      {isLoading ? (
        <LoadingContainer>
          <CircularProgress size={50} />
          <LoadingMessage variant="h6">Fetching Merchants....</LoadingMessage>
        </LoadingContainer>
      ) : (
        <>
          <StyledInput type="text" placeholder="Search Merchants" onChange={handleSort} />
          <DataTable
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationPerPage={perPage}
            fixedHeader
            fixedHeaderScrollHeight="500px"
            highlightOnHover
            columns={columns}
            data={merchantsData}
            onChangePage={handlePageChange}
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
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
                  background: 'darkred',
                },
              },
              headCells: {
                style: {
                  color: 'white',
                  fontWeight: 'bold',
                  paddingTop: '10px',
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
              },
            }}
          />
        </>
      )}
    </Grid>
  );
};

export default MerchantTable;
