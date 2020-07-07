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
    const [trainings, setTrainings] = useState([]);

    const [schedulerData, setSchedulerData] = useState([]);

    const currentDate = moment().format('YYYY-MM-DD');
    /*const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
    ];*/

    useEffect(() => {
        setSchedulerData([
            { startDate: '2020-07-08T18:45', endDate: '2020-07-08T19:45', title: 'Meeting' },
            { startDate: '2020-07-07T18:00', endDate: '2020-07-07T18:45', title: 'Go to a gym' },
        ]);
        fetchData();
    }, []);
    
    const fetchData = () => {
        fetch(trainings_api)
        .then(response => response.json())
        .then(data => {
            setTrainings(data.content);
            generateScheduleData(data.content);
        })
        .catch(err => console.error(err))
    };

    const generateScheduleData = (trainings) => {
        let data = []
        for (let i = 0; i < trainings.length; i ++) {
            let training = trainings[i];
            let endDate = moment(training.date).add(training.duration, 'minutes')
            data[i] = {startDate : training.date, endDate : endDate, title : training.activity}
        }

        setSchedulerData(data);
    }

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