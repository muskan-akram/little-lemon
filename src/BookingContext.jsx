import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { fetchAPI } from './api.jsx';

const BookingStateContext = createContext();
const BookingDispatchContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'initialize':
      return { ...state, date: action.date, times: action.times };
    case 'update_date':
      return { ...state, date: action.date, times: action.times };
    case 'remove_time':
      return { ...state, times: state.times.filter(t => t !== action.time) };
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { date: '', times: [] });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    fetchAPI(today).then(times => dispatch({ type: 'initialize', date: today, times }));
  }, []);

  return (
    <BookingStateContext.Provider value={state}>
      <BookingDispatchContext.Provider value={dispatch}>
        {children}
      </BookingDispatchContext.Provider>
    </BookingStateContext.Provider>
  );
}

export function useBookingState() {
  return useContext(BookingStateContext);
}
export function useBookingDispatch() {
  return useContext(BookingDispatchContext);
}