// React libraries
import React, { Component } from 'react';

// React Big Calendar
import Scheduler, { SchedulerData, ViewTypes } from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import moment from 'moment';

// Components
import { MedForm } from '../../../../components'

// utils
import API from '../../../../utils/API';


class Calendar extends Component {
  constructor(props) {
    super(props);

    //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
    let schedulerData = new SchedulerData(moment().format('YYYY-MM-DD'), ViewTypes.Week);
    schedulerData.localeMoment.locale('en');

    this.state = {
      viewModel: schedulerData,
      resources: [],
      events: [],
      userMeds: [],
      medToEdit: {},
      open: false
    }
  }

  getResources(data) {
    let resources = []
    for (const med of data) {
      resources.push({
        id: med.name,
        name: med.name,
      })
    }
    return resources;
  }

  getEvents(data) {
    let events = []
    const colors = ['#7fc5f6', '#f759ab', '#93b5e1', '#B56AD7', '#7579e7', '#51adcf', '#f6acc8'];

    for (let i = 0; i < data.length; i++) {
      const med = data[i];
      const time = moment(med.startDate).format('h:mm A');
      const recurringDay = moment(med.startDate).format('dd').toUpperCase();
      const recurringDate = moment(med.startDate).format('D');
      const recurringStartDay = med.startDate.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '').slice(0, -4);

      if (med.frequency === 'ONCE daily') {
        console.log(med)
        events.push({
          id: med._id,
          start: moment(med.startDate).format('YYYY-MM-DD hh:mm:ss'),
          end: moment(med.startDate).add(5, 'minutes').format('YYYY-MM-DD hh:mm:ss'),
          resourceId: med.name,
          movable: false,
          bgColor: colors[i],
          title: `${med.name} ${time}`,
          rrule: `FREQ=DAILY;DTSTART=${recurringStartDay};BYDAY=MO,TU,WE,TH,FR,SA,SU`,
        })
      } else if (med.frequency === 'ONCE a MONTH') {
        events.push({
          id: med._id,
          start: moment(med.startDate).format('YYYY-MM-DD hh:mm:ss'),
          end: moment(med.startDate).add(5, 'minutes').format('YYYY-MM-DD hh:mm:ss'),
          resourceId: med.name,
          movable: false,
          bgColor: colors[i],
          title: `${med.name} ${time}`,
          rrule: `FREQ=MONTHLY;DTSTART=${recurringStartDay};BYMONTHDAY=${recurringDate}`,
        })
      } else if (med.frequency === 'ONCE a WEEK') {
        events.push({
          id: med._id,
          start: moment(med.startDate).format('YYYY-MM-DD hh:mm:ss'),
          end: moment(med.startDate).add(5, 'minutes').format('YYYY-MM-DD hh:mm:ss'),
          resourceId: med.name,
          movable: false,
          bgColor: colors[i],
          title: `${med.name} ${time}`,
          rrule: `FREQ=WEEKLY;DTSTART=${recurringStartDay};BYDAY=${recurringDay}`,
        })
      }

    }
    return events;
  }

  componentDidMount() {
    API.getMeds(localStorage.getItem('userId'))
      .then((res) => {
        let schedulerData = this.state.viewModel
        schedulerData.setResources(this.getResources(res.data))
        schedulerData.setEvents(this.getEvents(res.data))

        this.setState({
          viewModel: schedulerData,
          resources: this.getResources(res.data),
          events: this.getEvents(res.data),
          userMeds: res.data
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(this.state.events);
    this.setState({
      viewModel: schedulerData,
    })
  }

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(this.state.events);
    this.setState({
      viewModel: schedulerData,
    })
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(this.state.events);
    this.setState({
      viewModel: schedulerData,
    })
  }

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(this.state.events);
    this.setState({
      viewModel: schedulerData,
    })
  }

  eventClicked = (schedulerData, event) => {
    this.setState({
      open: true
    });
  }

  edit = async (schedulerData, event) => {
    const id = event.id;
    const userMedArr = this.state.userMeds;

    const setMedState = await this.setState({
      open: true,
      medToEdit: userMedArr.filter(item => item._id === id.toString().slice(0, -2))[0]
    }, () => {
      console.log(this.state.medToEdit);
    })
  };

  handleSubmit = () => {
    API.editMed(this.state.medToEdit._id, this.state.medToEdit)
      .then(() => {
        console.log("EDITED");
        window.location.reload();
      })
  }

  handleChange = () => {
    this.setState({
      medToEdit: [],
    })
  }

  delete = (schedulerData, event) => {
    const id = event.id;

    API.deleteMed(id.toString().slice(0, -2))
      .then(() => {
        window.location.reload();
      })
  };

  render() {
    return (
      <>
        <Scheduler
          schedulerData={this.state.viewModel}
          prevClick={this.prevClick}
          nextClick={this.nextClick}
          onSelectDate={this.onSelectDate}
          onViewChange={this.onViewChange}
          eventItemClick={this.eventClicked}
          viewEventClick={this.edit}
          viewEventText="EDIT"
          viewEvent2Text="DELETE"
          viewEvent2Click={this.delete}
        />
        <MedForm
          open={this.state.open}
          onClose={() => (this.setState({ open: false }))}
          in={this.state.open}
          action={'Update'}
          name={this.state.medToEdit.name}
          strength={this.state.medToEdit.strength}
          freqency={this.state.medToEdit.freqency}
          selectedTime={this.state.medToEdit.time}
          selectedStartDate={this.state.medToEdit.start}
          title={'Edit Medication'}
          onClick={this.handleSubmit}
          onChange={this.handleChange}
        />
      </>
    )
  }
}
export default DragDropContext(HTML5Backend)(Calendar)