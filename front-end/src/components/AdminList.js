import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestDeleteWithToken, requestGetWithToken } from '../services/requests';
import UsersContext from '../context/UsersContext';
import styles from '../css/Admin.module.css';

function AdminList() {
  const ROUTE = 'admin_manage__';
  const history = useHistory();

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
    return <h2>{error.response?.statusText || 'Algo deu errado!'}</h2>;
  }
  return (
    <div>
      <h2>Lista de usuários</h2>
      <table className={ styles.adminTable }>
        <thead>
          <tr>
            <th> </th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th> </th>
          </tr>
        </thead>
        {
          usersList?.length > 0
          && (
            <tbody>
              {
                usersList.map((user, index) => (
                  <tr key={ user.email }>
                    <td data-testid={ `${ROUTE}element-user-table-item-number-${index}` }>
                      { index + 1}
                    </td>
                    <td
                      className={ styles.tableName }
                      data-testid={ `${ROUTE}element-user-table-name-${index}` }
                    >
                      { user.name }
                    </td>
                    <td
                      className={ styles.tableEmail }
                      data-testid={ `${ROUTE}element-user-table-email-${index}` }
                    >
                      { user.email.split('@')[0] }
                      <br />
                      {`@${user.email.split('@')[1]}`}
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
                        <span
                          className="material-icons-outlined"
                        >
                          highlight_off
                        </span>
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
