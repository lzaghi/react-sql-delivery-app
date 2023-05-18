import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestDeleteWithToken, requestGetWithToken } from '../services/requests';
import UsersContext from '../context/UsersContext';

function AdminList() {
  const ROUTE = 'admin_manage__';
  const history = useHistory();

  // const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  const { usersList, setUsersList } = useContext(UsersContext);

  const handleDelete = async (id) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      await requestDeleteWithToken(`/users/${id}`, token);

      const users = await requestGetWithToken('/users', token);
      setUsersList(users);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const users = await requestGetWithToken('/users', token);
        setUsersList(users);
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
  }, [history, setUsersList]);

  if (error) {
    <h2>{error?.response?.statusText}</h2>;
  }
  return (
    <div className="admin-list">
      <h3>Usuários</h3>
      <table className="checkout-table admin-table">
        <thead>
          <tr>
            <th>Índice</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        {
          usersList?.length > 0
          && (
            <tbody>
              {
                usersList.map((user, index) => (
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
                        onClick={ () => handleDelete(user.id) }
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          )
        }
      </table>
    </div>
  );
}

export default AdminList;
