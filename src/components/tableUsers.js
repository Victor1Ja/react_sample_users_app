export default function TableUsers({ deleteUser, users }) {
  return (
    <div>
      <h2>Table of users</h2>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Gender</td>
            <td>Status</td>
            <td> Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    name="delete"
                    onClick={() => {
                      deleteUser(user.id);
                      console.log('deleted');
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
