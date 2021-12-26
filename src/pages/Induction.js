import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { filter } from 'lodash';
import axios from 'axios';
import plusFill from '@iconify/icons-eva/plus-fill';
// import { sentenceCase } from 'change-case';
// material

import {
  Card,
  Chip,
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
import { NewInductionModal } from '../components/_dashboard/induction/NewInductionModal';

import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
// import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'department', label: 'Department', alignRight: false },
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

export default function Induction() {
  const [newInductionModalOpen, setNewInductionModalOpen] = React.useState(false);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [induction, setUser] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleNewInductionModal = () => setNewInductionModalOpen(!newInductionModalOpen);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - induction.length) : 0;

  const filteredUsers = applySortFilter(induction, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  useEffect(() => {
    axios
      .post('https://pacific-dusk-26535.herokuapp.com/get-upcoming-inductions-events', {
        session_id: localStorage.getItem('session_id'),
        get_what: 'induction'
      })
      .then((eventRes) => {
        console.log('Induction: ', eventRes.data.induction_list);
        const data = eventRes.data.induction_list.map((inductionData) => ({
          title: inductionData.title,
          description: inductionData.description,
          department: inductionData.dept_list
        }));
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Page title="Dashboard: Induction | UniworX">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Inductions
          </Typography>
          {JSON.parse(localStorage.getItem('user')).roles > 35 &&
          JSON.parse(localStorage.getItem('user')).roles <= 40 ? (
            <>
              <Button
                variant="contained"
                onClick={handleNewInductionModal}
                startIcon={<Icon icon={plusFill} />}
              >
                Request Induction
              </Button>
              <NewInductionModal
                open={newInductionModalOpen}
                handleClose={handleNewInductionModal}
              />
            </>
          ) : null}
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, padding: 3 }}>
              <Table>
                <UserListHead
                  // order={order}
                  // orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={induction.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, key) => {
                      const { title, description, department } = row;

                      return (
                        <TableRow hover key={key} tabIndex={-1} role="checkbox">
                          <TableCell align="left">{title}</TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">
                            {department.map((dept) => (
                              <Chip
                                label={dept}
                                variant="outlined"
                                size="small"
                                style={{ marginRight: 3 }}
                              />
                            ))}
                          </TableCell>
                          <TableCell align="right" width={50}>
                            <Button component={Link} to="/dashboard/applications/">
                              Applications <Icon icon="akar-icons:arrow-right" inline />
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
            count={induction.length}
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
