import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { filter } from 'lodash';
import axios from 'axios';
import plusFill from '@iconify/icons-eva/plus-fill';
// import { sentenceCase } from 'change-case';
// material

import {
  Card,
  Table,
  Stack,
  Avatar,
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
import { RoleDropdown } from '../components/_dashboard/socities/RoleDropdown';
// import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'facultyHeadName', label: 'Faculty Head', alignRight: false },
  { id: 'facultyCoheadName', label: 'Faculty Co Head', alignRight: false },
  { id: 'presidentName', label: 'President', alignRight: false },
  { id: 'vicepresidentName', label: 'Vice President', alignRight: false }
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

export default function Socities() {
  const [page, setPage] = useState(0);
  const [freeTeachers, setFreeTeachers] = useState([]);
  const [order, setOrder] = useState('asc');
  const [socities, setSocities] = useState([]);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - socities.length) : 0;

  const filteredUsers = applySortFilter(socities, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  useEffect(() => {
    axios
      .post('https://pacific-dusk-26535.herokuapp.com/get-all-societies', {
        session_id: localStorage.getItem('session_id')
      })
      .then((societyRes) => {
        console.log('Societies: ', societyRes.data.societies_list);
        const data = societyRes.data.societies_list.map((societyData) => ({
          id: societyData.id,
          name: societyData.name,
          facultyHead: societyData.faculty_head,
          facultyCohead: societyData.faculty_cohead,
          president: societyData.president,
          vicePresident: societyData.vice_president,
          facultyHeadName: societyData.faculty_head_name,
          facultyCoheadName: societyData.faculty_cohead_name,
          presidentName: societyData.president_name,
          vicepresidentName: societyData.vicepresident_name
        }));
        setSocities(data);
      })
      .catch((err) => console.log(err));
    axios
      .post('https://pacific-dusk-26535.herokuapp.com/get-free-faculty', {
        session_id: localStorage.getItem('session_id')
      })
      .then((res) => {
        let tempfaculty = res.data.faculty_list;
        tempfaculty = tempfaculty.filter(
          (faculty) => faculty.roles < JSON.parse(localStorage.getItem('user')).roles
        );
        setFreeTeachers(tempfaculty);
        console.log('Free Teachers: ', res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Page title="Dashboard: Events | UniworX">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Socities
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
                  rowCount={socities.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, key) => {
                      const {
                        id,
                        name,
                        facultyHead,
                        facultyCohead,
                        facultyHeadName,
                        facultyCoheadName,
                        presidentName,
                        vicepresidentName
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
                              <Avatar
                                alt={name}
                                src="/static/mock-images/avatars/avatar_default.jpg"
                              />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          {/* <TableCell align="left">{facultyHeadName}</TableCell> */}
                          <TableCell align="left">
                            <RoleDropdown
                              freeTeachers={freeTeachers}
                              access={60}
                              userID={facultyHead}
                              name={facultyHeadName}
                              societyID={id}
                            />
                          </TableCell>
                          {/* <TableCell align="left">{facultyCoheadName}</TableCell> */}
                          <TableCell align="left">
                            <RoleDropdown
                              freeTeachers={freeTeachers}
                              access={50}
                              userID={facultyCohead}
                              name={facultyCoheadName}
                              societyID={id}
                            />
                          </TableCell>

                          <TableCell align="left">{presidentName}</TableCell>
                          <TableCell align="left">{vicepresidentName}</TableCell>
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
            count={socities.length}
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
