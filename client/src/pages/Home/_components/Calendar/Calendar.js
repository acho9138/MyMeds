// React libraries
import React, { Component } from 'react';

// React Big Calendar
import Scheduler, { DemoData, SchedulerData, ViewTypes } from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import moment from 'moment'

// utils
import API from '../../../../utils/API';


class Calendar extends Component {
  constructor(props) {
    super(props);

    //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
    let schedulerData = new SchedulerData(moment().format('YYYY-MM-DD'), ViewTypes.Week);
    schedulerData.localeMoment.locale('en');
    schedulerData.setResources(DemoData.resources);
    schedulerData.setEvents(DemoData.events);
    this.state = {
      viewModel: schedulerData
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
    for (let i = 0; i < data.length; i++) {
      const med = data[i]
      const time = new Date(med.startDate)
      console.log(time.getTime())
      events.push({
        id: i + 1,
        start: moment(med.startDate).format('YYYY-MM-DD hh:mm:ss'),
        end: moment(med.startDate).add(15, 'minutes').format('YYYY-MM-DD hh:mm:ss'),
        resourceId: med.name,
        movable: false,
        title: 'Take pills sucker',
      })
    }
    return events;
  }

  componentDidMount() {
    API.getMeds(localStorage.getItem('userId'))
      .then((res) => {
        console.log(res.data)
        let schedulerData = this.state.viewModel
        schedulerData.setResources(this.getResources(res.data))
        schedulerData.setEvents(this.getEvents(res.data))

        this.setState({ viewModel: schedulerData })
      }).catch((error) => {
        console.error(error)
      })
  }

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    })
  }

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    })
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    })
  }

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    })
  }

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
  }

  render() {
    return (
      <Scheduler
        schedulerData={this.state.viewModel}
        prevClick={this.prevClick}
        nextClick={this.nextClick}
        onSelectDate={this.onSelectDate}
        onViewChange={this.onViewChange}
        eventItemClick={this.eventClicked}
      />
    )
  }
}
export default DragDropContext(HTML5Backend)(Calendar)