import { useState } from 'react';

export default function InputUser({ addUser }) {
  const [data, setData] = useState({ status: 'active', gender: 'male' });
  const [message, setMessage] = useState({ message: '', type: '' });

  const changeVal = e => {
    const target = e.target;
    const value = target.type === 'select' ? target.checked : target.value;
    const name = target.name;
    setData({ ...data, [name]: value });
  };
  const validate = data => {
    if (!data.name || data.name.length === 0) {
      setMessage({ message: 'Name is required', type: 'error' });
      return false;
    }
    if (!data.email || data.email.length === 0) {
      setMessage({ message: 'Email is required', type: 'error' });
      return false;
    }
    const regexEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!data.email.match(regexEmail)) {
      setMessage({ message: 'Invalid Email', type: 'error' });
      return false;
    }
    if (!data.gender) {
      setMessage({ message: 'Gender is required', type: 'error' });
      return false;
    }
    if (!data.status) {
      setMessage({ message: 'Status is required', type: 'error' });
      return false;
    }

    setMessage({ message: 'User submitted', type: 'valid' });
    return true;
  };
  return (
    <div className="form">
      <label>Add a new User</label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          onChange={changeVal}
          value={data.name || ''}
        />
      </label>
      {/* <br /> */}
      <label>
        Email:
        <input
          type="text"
          name="email"
          onChange={changeVal}
          value={data.email || ''}
        />
      </label>
      {/* <br /> */}
      <label>
        Gender:
        <select value={data.gender} onChange={changeVal} name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      {/* <br /> */}
      <label>
        Status:
        <select value={data.status} onChange={changeVal} name="status">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      {/* <br /> */}
      {message.type === 'error' && (
        <label className="error">{message.message}</label>
      )}
      {message.type !== 'error' && (
        <label className="valid">{message.message}</label>
      )}
      {/* <input type="submit" value="Submit" /> */}
      <label>
        <button
          name="add"
          onClick={() => {
            if (validate(data) === true) addUser(data);
          }}>
          Submit
        </button>
      </label>
    </div>
  );
}
