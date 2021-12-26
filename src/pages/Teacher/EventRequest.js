import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { filter } from 'lodash';
import axios from 'axios';
import plusFill from '@iconify/icons-eva/plus-fill';
import { sentenceCase } from 'change-case';
// material

import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';

// components
import Page from '../../components/Page';

import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead } from '../../components/_dashboard/user';

const TABLE_HEAD = [
  { id: 'event_name', label: 'Title', alignRight: false },
  { id: 'event_description', label: 'Description', alignRight: false },
  { id: 'event_start_date', label: 'Date', alignRight: false },
  { id: 'event_start_time', label: 'Time', alignRight: false },
  { id: 'event_venue', label: 'Venue', alignRight: false },
  { id: '', lable: 'Actions' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Events() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [eventItem, setEventItem] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleFilterByName = (event) => {
  //   setFilterName(event.target.value);
  // };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - eventItem.length) : 0;

  const filteredUsers = applySortFilter(eventItem, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const handleApproveEvent = (response, eventID) => {
    console.log(response, eventID);
    axios
      .post('https://pacific-dusk-26535.herokuapp.com/approve-event', {
        session_id: localStorage.getItem('session_id'),
        status: response,
        event_id: eventID
      })
      .then((res) => {
        navigate('/dashboard/events');

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .post('https://pacific-dusk-26535.herokuapp.com/get-pending-society-inductions-events', {
        session_id: localStorage.getItem('session_id'),
        get_what: 'event'
      })
      .then((eventRes) => {
        console.log('Events: ', eventRes.data.event_list);
        const data = eventRes.data.event_list.map((eventData) => ({
          id: eventData.event_id,
          image: eventData.image,
          name: eventData.event_name,
          description: eventData.event_description,
          startDate: eventData.event_start_date,
          startTime: eventData.event_start_time,
          venue: eventData.event_venue,
          approved: eventData.approved
        }));
        setEventItem(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Page title="Dashboard: Event Requests | UniworX">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Event Requests
          </Typography>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, padding: 3 }}>
              <Table>
                <UserListHead
                  // order={order}
                  // orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={eventItem.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, key) => {
                      const {
                        id,
                        image,
                        name,
                        description,
                        startDate,
                        startTime,
                        venue,
                        approved
                      } = row;

                      return (
                        <TableRow
                          hover
                          key={key}
                          tabIndex={-1}
                          role="checkbox"
                          // aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={image} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">
                            {new Date(startDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="left">{startTime}</TableCell>

                          <TableCell align="left">{venue}</TableCell>
                          <TableCell width={168}>
                            <Button color="success" onClick={() => handleApproveEvent(true, id)}>
                              Approve
                            </Button>
                            <Button color="error" onClick={() => handleApproveEvent(false, id)}>
                              Reject
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={eventItem.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack> */}

        {/* <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid> */}
      </Container>
    </Page>
  );
}
