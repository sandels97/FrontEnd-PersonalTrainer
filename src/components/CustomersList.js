import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';

export default function CustomerList() {

  const customer_api = 	"https://customerrest.herokuapp.com/api/customers";
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(customer_api)
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
  };

  const columns = [
    {
      Header : 'First name',
      accessor : 'firstname'
    },
    {
      Header : 'Last name',
      accessor : 'lastname'
    },
    {
      Header : 'Street address',
      accessor : 'streetaddress'
    },
    {
      Header : 'Postcode',
      accessor : 'postcode'
    },
    {
      Header : 'City',
      accessor : 'city'
    },
    {
      Header : 'Email',
      accessor : 'email'
    },
    {
      Header : 'Phone',
      accessor : 'phone'
    }

  ]
  return (
    <div>
      <ReactTable filterable={true} data={customers} columns={columns} />
    </div>
  );
}
