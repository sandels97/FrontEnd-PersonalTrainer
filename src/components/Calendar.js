import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Appointments,
    ViewSwitcher,
    Toolbar,
    DateNavigator
  } from '@devexpress/dx-react-scheduler-material-ui';

import moment from 'moment';

export default function Calendar(props) {

    const trainings_api = 	"https://customerrest.herokuapp.com/api/trainings";
  
    const [schedulerData, setSchedulerData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      fetch(trainings_api)
      .then(response => response.json())
      .then(data => {
        fetchCustomers(data.content);
      })
      .catch(err => console.error(err))
    };
  
    const fetchCustomers = (trainings) => {
    
        //Generate appointments for scheduler
        for(let i = 0; i< trainings.length; i++) {
            let training = trainings[i];

            fetch(training.links[2].href)
            .then(response => response.json())
            .then(data => {
                training.customerName = data.firstname + " " + data.lastname;

                let endDate = moment(training.date).add(training.duration, 'minutes')
                let event = {startDate : training.date, endDate : endDate, title : training.activity + " / " + training.customerName}
                setSchedulerData(array => [...array, event])
            })
            .catch(err => console.error(err))
        }
    };


    const currentDate = moment().format('YYYY-MM-DD');
    /*const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
    ];*/

    return (
        <div>
              <Paper>
                <Scheduler data={schedulerData}>
                <ViewState
                    defaultCurrentDate={currentDate}
                    defaultCurrentViewName="Week"
                />

                <DayView/>
                <WeekView/>
                <MonthView/>

                <Toolbar />
                <DateNavigator />
                <ViewSwitcher />
                <Appointments />
                </Scheduler>
            </Paper>
        </div>
    )
}