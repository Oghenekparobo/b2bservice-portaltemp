import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useQuery } from '@tanstack/react-query';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import customFetch, { useActionMerchant } from '../../../utils/http';

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
  const [page, setPage] = useState(1);
  const [merchantsData, setMerchantsData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const perPage = 10;

  const { isLoading, data } = useQuery({
    queryKey: ['fetch-merchants'],
    queryFn: async () => {
      const { data } = await customFetch.get('/fetch-merchants', {
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

  const handlePageChange = (page) => {
    setPage(page);
  };
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

                    actionMerchant({ username: row.username, type: 'suspend' });
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
              onClick={() => actionMerchant({ username: row.username, type: 'activate' })}
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

  console.log(page);

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
            progressPending={isLoading}
            pagination
            paginationServer
            paginationPerPage={perPage}
            paginationTotalRows={totalRows}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover
            columns={columns}
            data={merchantsData && merchantsData}
            onChangePage={(page) => handlePageChange(page)}
            // paginationComponentOptions={{
            //   noRowsPerPage: true,
            // }}
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
