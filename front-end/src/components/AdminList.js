import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestGetWithToken } from '../services/requests';

function AdminList() {
  const ROUTE = 'admin_manage__';
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const usersList = await requestGetWithToken('/users', token);
        setUsers(usersList);
      } catch (e) {
        const UNAUTHORIZED = 401;
        if (e?.response?.status === UNAUTHORIZED) {
          localStorage.removeItem('user');
          history.push('/login');
        }
        setError(e);
      }
    }
    fetchData();
  }, [history]);

  if (error) {
    <h2>{error?.response?.statusText}</h2>;
  }
  return (
    <table>
      {console.log(users)}
      <thead>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {
          users.length && users.map((user, index) => (
            <tr key={ index }>
              <td data-testid={ `${ROUTE}element-user-table-item-number-${index}` }>
                { index + 1}
              </td>
              <td data-testid={ `${ROUTE}element-user-table-name-${index}` }>
                { user.name }
              </td>
              <td data-testid={ `${ROUTE}element-user-table-email-${index}` }>
                { user.email }
              </td>
              <td data-testid={ `${ROUTE}element-user-table-role-${index}` }>
                { user.role === 'customer' ? 'Cliente' : 'Vendedor' }
              </td>
              <td>
                <button
                  data-testid={ `${ROUTE}element-user-table-remove-${index}` }
                  type="button"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))

        }
      </tbody>
    </table>
  );
}

export default AdminList;
