import React from 'react';
import PropTypes from 'prop-types';

import Event from './Event';
import EventRow from './EventRow';

import { uniqueDate } from '../../../services/historyDate';

/**
 * Get list of events,
 * passes each event unique date to EventRow
 * and event details to Event
 * @param {Array} events
 */
const HistoryList = ({ events }) => {
  const historyDate = uniqueDate(events);

  return (
    <>
      {Object.keys(historyDate).map(date => (
        <div className="incidents-block" key={date}>
          <EventRow data={date} />
          {historyDate[date].map((event, index) => (
            <Event data={event} key={index} />
          ))}
        </div>
      ))}
    </>
  );
};

HistoryList.propTypes = {
  events: PropTypes.array
};

export default HistoryList;