import Vue from 'vue';
import moment from 'moment';

Vue.filter('dateTimeFormat', (value, parameter) => {
    const date = moment.utc(value);
    return date.format(parameter)
});