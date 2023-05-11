import React from 'react';
import Header from '../components/Header';
import AdminForm from '../components/AdminForm';
import AdminList from '../components/AdminList';

function Admin() {
  return (
    <div>
      <Header />
      <AdminForm />
      <AdminList />
    </div>
  );
}

export default Admin;
