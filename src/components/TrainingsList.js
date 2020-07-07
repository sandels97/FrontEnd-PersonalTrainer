import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Button from '@material-ui/core/Button';

export default function TrainingsList() {

  const trainings_api = 	"https://customerrest.herokuapp.com/api/trainings";
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(trainings_api)
    .then(response => response.json())
    .then(data => setTrainings(data.content))
    .catch(err => console.error(err))
  };

  const deleteTraining = (link) => {
    if(window.confirm("Delete this training from the database? This action is irreversible.")) {
      fetch(link, {method : 'DELETE'})
      .then(res => {
        fetchData();
      })
      .catch(err => console.error(err))
    }
  };

  const columns = [
    {
      Header : 'Date',
      id : 'date',
      accessor : row => moment(row.date).format('MMMM Do YYYY, h:mm:ss')
    },
    {
      Header : 'Duration',
      accessor : 'duration'
    },
    {
      Header : 'Activity',
      accessor : 'activity'
    },
    {
      sortable : false,
      filterable : false,
      width : 100,
      accessor : 'links.0.href',
      Cell: row => <Button size="small" color="secondary" onClick={() => deleteTraining(row.value)}>Delete</Button>
    }
  ]
  return (
    <div>
      <ReactTable filterable={true} data={trainings} columns={columns} />
    </div>
  );
}
