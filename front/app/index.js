
import angular from 'angular'
import RouteModule from 'angular-route'
import 'bootstrap/dist/css/bootstrap.css'
import { route } from './app.route'
import { AccueilComponent } from './accueil/accueil.component'
import { PlanningComponent } from './planning/planning.component'
import { ModalComponent } from './modal/modal.component'
import { UtilisateursService } from './service/utilisateur.service'
// import { u1 } from 'angular-bootstrap-calendar'
// import { u2 } from 'angular-ui-bootstrap'
import {moment} from 'moment'
// import { u3 } from 'mwl.calendar'
// import { u4 } from 'ngAnimate'
// import { u5 } from 'ui-bootstrap'

angular.module('app', [RouteModule, 'mwl.calendar', 'ui.bootstrap']) //, [require('angular-bootstrap-calendar'), require('angular-ui-bootstrap')], ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']
.value('API_URL', API_URL)
.value('moment', moment)
.service('UtilisateursService', UtilisateursService)
.component('accueil', AccueilComponent)
.component('planning', PlanningComponent)
.component('modal', ModalComponent)
.config(route, ['calendarConfig', function (calendarConfig) {
  console.log(calendarConfig)
  calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html'
  calendarConfig.dateFormatter = 'moment'
  calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'
  calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM'
  calendarConfig.i18nStrings.weekNumber = 'Week {week}'
  calendarConfig.displayAllMonthEvents = true
  calendarConfig.showTimesOnWeekView = true
}])
.controller('KitchenSinkCtrl', function (moment, alert, calendarConfig) {
  var vm = this

    // These variables MUST be set as a minimum for the calendar to work
  vm.calendarView = 'month'
  vm.viewDate = new Date()
  var actions = [{
    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
    onClick: function (args) {
      alert.show('Edited', args.calendarEvent)
    }
  }, {
    label: '<i class=\'glyphicon glyphicon-remove\'></i>',
    onClick: function (args) {
      alert.show('Deleted', args.calendarEvent)
    }
  }]
  vm.events = [{
    title: 'An event',
    color: calendarConfig.colorTypes.warning,
    startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
    endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
    draggable: true,
    resizable: true,
    actions: actions
  }, {
    title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
    color: calendarConfig.colorTypes.info,
    startsAt: moment().subtract(1, 'day').toDate(),
    endsAt: moment().add(5, 'days').toDate(),
    draggable: true,
    resizable: true,
    actions: actions
  }, {
    title: 'This is a really long event title that occurs on every year',
    color: calendarConfig.colorTypes.important,
    startsAt: moment().startOf('day').add(7, 'hours').toDate(),
    endsAt: moment().startOf('day').add(19, 'hours').toDate(),
    recursOn: 'year',
    draggable: true,
    resizable: true,
    actions: actions
  }]

  vm.cellIsOpen = false

  vm.addEvent = function () {
    vm.events.push({
      title: 'New event',
      startsAt: moment().startOf('day').toDate(),
      endsAt: moment().endOf('day').toDate(),
      color: calendarConfig.colorTypes.important,
      draggable: true,
      resizable: true
    })
  }

  vm.eventClicked = function (event) {
    alert.show('Clicked', event)
  }

  vm.eventEdited = function (event) {
    alert.show('Edited', event)
  }

  vm.eventDeleted = function (event) {
    alert.show('Deleted', event)
  }

  vm.eventTimesChanged = function (event) {
    alert.show('Dropped or resized', event)
  }

  vm.toggle = function ($event, field, event) {
    $event.preventDefault()
    $event.stopPropagation()
    event[field] = !event[field]
  }

  vm.timespanClicked = function (date, cell) {
    if (vm.calendarView === 'month') {
      if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
        vm.cellIsOpen = false
      } else {
        vm.cellIsOpen = true
        vm.viewDate = date
      }
    } else if (vm.calendarView === 'year') {
      if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
        vm.cellIsOpen = false
      } else {
        vm.cellIsOpen = true
        vm.viewDate = date
      }
    }
  }
})
.factory('alert', function ($uibModal) {
  function show (action, event) {
    return $uibModal.open({
      template: '<modal></modal>',
      controller: function () {
        var vm = this
        vm.action = action
        vm.event = event
      },
      controllerAs: 'vm'
    })
  }

  return {
    show: show
  }
})







