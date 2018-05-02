import moment from 'moment';

export const dateFromNow = (timestamp) => {
    return moment(timestamp).fromNow();
}