// React libraries
import React, { Component } from 'react';

// React Big Calendar
import Scheduler, { SchedulerData, ViewTypes } from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// NPM package
import moment from 'moment';

// Components
import { MedForm } from '../../../../components'

// utils
import API from '../../../../utils/API';


class Calendar extends Component {
  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData(moment().format('YYYY-MM-DD'), ViewTypes.Week);
    schedulerData.localeMoment.locale('en');

    this.state = {
      viewModel: schedulerData,
      resources: [],
      events: [],
      userMeds: [],
      updatedMed: {},
      open: false
    };
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
      const time = moment(med.time).format('HH:mm A');
      const startTime = moment(med.startDate).format('YYYY-MM-DD HH:mm:ss');
      const recurringDay = moment(med.startDate).format('dd').toUpperCase();
      const recurringDate = moment(med.startDate).format('D');
      const recurringStartDay = med.startDate.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '').slice(0, -4);

      if (med.frequency === 'ONCE daily') {
        events.push({
          id: med._id,
          start: startTime,
          end: moment(med.startDate).add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
          resourceId: med.name,
          movable: false,
          bgColor: colors[i],
          title: time,
          rrule: `FREQ=DAILY;DTSTART=${recurringStartDay};BYDAY=MO,TU,WE,TH,FR,SA,SU`,
        })
      } else if (med.frequency === 'ONCE a MONTH') {
        events.push({
          id: med._id,
          start: startTime,
          end: moment(med.startDate).add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
          resourceId: med.name,
          movable: false,
          bgColor: colors[i],
          title: time,
          rrule: `FREQ=MONTHLY;DTSTART=${recurringStartDay};BYMONTHDAY=${recurringDate}`,
        })
      } else if (med.frequency === 'ONCE a WEEK') {
        events.push({
          id: med._id,
          start: startTime,
          end: moment(med.startDate).add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
          resourceId: med.name,
          movable: false,
          bgColor: colors[i],
          title: time,
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
        });
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

  onEditPress = (schedulerData, event) => {
    const id = event.id.split('-')[0];
    const userMedArr = this.state.userMeds;

    this.setState({
      open: true,
      updatedMed: userMedArr.filter(item => item._id === id.toString())[0]
    })
  };

  handleSubmit = () => {
    API.editMed(this.state.updatedMed._id, this.state.updatedMed)
      .then(() => {
        window.location.reload();
      })
  };

  handleOnChange = (key, value) => {
    this.setState({
      updatedMed: {
        ...this.state.updatedMed,
        [key]: value
      }
    })
  };

  delete = (schedulerData, event) => {
    const id = event.id.toString().slice(0, -3);

    API.deleteMed(id)
      .then(() => {
        alert('Medication has been deleted');
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
          eventItemClick={this.onEditPress}
          viewEventClick={this.onEditPress}
          viewEventText='EDIT'
          viewEvent2Text='DELETE'
          viewEvent2Click={this.delete}
        />
        <MedForm
          open={this.state.open}
          onClose={() => (this.setState({ open: false }))}
          in={this.state.open}
          action={'Update'}
          title={'Edit Medication'}
          onClick={this.handleSubmit}
          onChangeName={(val) => this.handleOnChange(val.target.name, val.target.value)}
          onChangeStrength={(val) => this.handleOnChange(val.target.name, val.target.value)}
          onChangeFrequency={(val) => this.handleOnChange(val.target.name, val.target.value)}
          onChangeTime={(val) => this.handleOnChange("time", val)}
          onChangeStartDate={(val) => this.handleOnChange("startDate", val)}
          onChangeEndDate={(val) => this.handleOnChange("endDate", val)}
          name={this.state.updatedMed.name}
          strength={this.state.updatedMed.strength}
          time={this.state.updatedMed.time}
          frequency={this.state.updatedMed.frequency}
          endDate={this.state.updatedMed.endDate}
          startDate={this.state.updatedMed.startDate}
        />
      </>
    )
  }
}
export default DragDropContext(HTML5Backend)(Calendar)