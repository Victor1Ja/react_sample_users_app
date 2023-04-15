import { useEffect, useState } from 'react';
import env from 'react-dotenv';
import './App.css';
import InputUser from './components/inputUserForm';
import Pagination from './components/pagination';
import TableUsers from './components/tableUsers';

const ACCESS_TOKEN = env.ACCESS_TOKEN || '';
export default function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [countAdd, setCountAdd] = useState(0);
  const [countDel, setCountDel] = useState(0);

  const loadData = async () => {
    let data = await fetch(
      `https://gorest.co.in/public/v2/users?page=${page}&per_page=${perPage}`
    );
    data = await data.json();
    console.log({ data });
    setUsers(data);
  };
  const deleteUser = async id => {
    const deleteUrl = `https://gorest.co.in/public/v2/users/${id}?access-token=${ACCESS_TOKEN}`;
    const obj = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(deleteUrl, obj);
    if (res.status === 204) setCountDel(countDel + 1);
    console.log(res.status);
  };
  const addUser = async data => {
    const addUrl = `https://gorest.co.in/public/v2/users?access-token=${ACCESS_TOKEN}`;
    const res = await fetch(addUrl, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    // console.log(res);
    if (res.status === 201) {
      setCountAdd(countAdd + 1);
      setPage(1);
    }
  };
  useEffect(() => {
    loadData();
  }, [countDel, countAdd, page]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <div class="container">
        <TableUsers users={users} deleteUser={deleteUser} />
      </div>
      <br />
      <div class="container">
        <Pagination currentPage={page} setCurrentPage={setPage} />
      </div>
      <InputUser addUser={addUser}></InputUser>
      <h3>Add Count {countAdd}</h3>
      <h3>Delete Count {countDel}</h3>
    </div>
  );
}
