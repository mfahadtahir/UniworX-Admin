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
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead } from '../components/_dashboard/user';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'dept', label: 'Department', alignRight: false },
  { id: 'batch', label: 'Batch', alignRight: false },
  { id: 'cgpa', label: 'CGPA', alignRight: false },
  { id: '' }
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

export default function InductionRequest() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [inductionItem, setInductionItem] = useState([]);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - inductionItem.length) : 0;

  const filteredUsers = applySortFilter(inductionItem, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const handleApproveInduction = (response, inductionId, userId, societyId, deptName) => {
    const data = {
      session_id: localStorage.getItem('session_id'),
      status: response,
      // induction_id: inductionId,
      society_id: societyId,
      user_id: userId,
      induction_type_excom: false,
      dept_name: deptName
    };
    console.log(data);
    // true, id, userId, societyId, dept
    axios
      .post('https://pacific-dusk-26535.herokuapp.com/approve-induction-response', data)
      .then((res) => {
        navigate('/dashboard/team');

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .post('https://pacific-dusk-26535.herokuapp.com/get-pending-induction-responses', {
        session_id: localStorage.getItem('session_id')
      })
      .then((inducData) => {
        console.log('Induction Applications: ', inducData.data);
        const data = inducData.data.induction_list.map((inductItem, key) => ({
          key,
          userId: inductItem.user_id,
          id: inductItem.induction_id,
          name: inductItem.first_name,
          batch: inductItem.batch,
          cgpa: inductItem.cgpa,
          dept: inductItem.dept_name,
          email: inductItem.email,
          societyId: inductItem.society_id
        }));
        setInductionItem(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Page title="Dashboard: Induction Requests | UniworX">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Applications
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
                  rowCount={inductionItem.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, key) => {
                      const { id, name, batch, cgpa, dept, email, societyId, userId } = row;

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
                              <Avatar
                                alt={name}
                                src="/static/mock-images/avatars/avatar_default.jpg"
                              />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>

                          <TableCell align="left">{dept}</TableCell>
                          <TableCell align="left">{batch}</TableCell>
                          <TableCell align="left">{cgpa}</TableCell>
                          <TableCell align="left">
                            <Button
                              color="success"
                              onClick={() =>
                                handleApproveInduction(true, id, userId, societyId, dept)
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              color="error"
                              onClick={() =>
                                handleApproveInduction(false, id, userId, societyId, dept)
                              }
                            >
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
            count={inductionItem.length}
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
