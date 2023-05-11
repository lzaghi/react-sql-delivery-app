import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import UsersContext from './UsersContext';

function UsersProvider({ children }) {
  const [usersList, setUsersList] = useState([]);

  const value = useMemo(
    () => ({ usersList, setUsersList }),
    [usersList, setUsersList],
  );
  return (
    <UsersContext.Provider value={ value }>
      {children}
    </UsersContext.Provider>
  );
}

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UsersProvider;
