import React, { useEffect, useState } from 'react';
import { fetchAPI, submitAPI } from '../api.jsx';
import { useBookingState, useBookingDispatch } from '../BookingContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function BookingForm(){
  const state = useBookingState();
  const dispatch = useBookingDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    date: state.date || '',
    time: '',
    guests: 2,
    occasion: 'None'
  });
  const [errors, setErrors] = useState({});
  const [loadingTimes, setLoadingTimes] = useState(false);

  useEffect(()=>{
    if (form.date) {
      setLoadingTimes(true);
      fetchAPI(form.date).then(times => {
        dispatch({ type: 'update_date', date: form.date, times });
        setLoadingTimes(false);
      });
    }
  }, [form.date]);

  useEffect(()=>{
    setForm(prev => ({ ...prev, date: state.date }));
  }, [state.date]);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.date) e.date = 'Please select a date.';
    if (!form.time) e.time = 'Please select a time.';
    if (!form.guests || form.guests < 1 || form.guests > 20) e.guests = 'Guests must be between 1 and 20.';
    return e;
  }

  async function handleSubmit(e){
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const formData = { ...form };
    const result = await submitAPI(formData);
    if (result.success){
      dispatch({ type: 'remove_time', time: form.time });
      navigate('/confirm', { state: { booking: formData } });
    } else {
      setErrors({ submit: 'Failed to submit booking. Please try again.' });
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Booking form">
      <div className="form-row">
        <div style={{flex:1}}>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} aria-required="true" />
          {errors.name && <div role="alert" className="error">{errors.name}</div>}
        </div>
        <div style={{flex:1}}>
          <label htmlFor="date">Date</label>
          <input id="date" name="date" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value,time:''})} aria-required="true" />
          {errors.date && <div role="alert" className="error">{errors.date}</div>}
        </div>
      </div>

      <div className="form-row">
        <div style={{flex:1}}>
          <label htmlFor="time">Time</label>
          <select id="time" name="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} aria-required="true">
            <option value="">-- Select a time --</option>
            {loadingTimes && <option>Loading...</option>}
            {!loadingTimes && state.times && state.times.length===0 && <option disabled>No available times</option>}
            {!loadingTimes && state.times && state.times.map(t=> (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.time && <div role="alert" className="error">{errors.time}</div>}
        </div>
        <div style={{flex:1}}>
          <label htmlFor="guests">Number of guests</label>
          <input id="guests" name="guests" type="number" min="1" max="20" value={form.guests} onChange={e=>setForm({...form,guests:parseInt(e.target.value || '0',10)})} />
          {errors.guests && <div role="alert" className="error">{errors.guests}</div>}
        </div>
      </div>

      <div className="form-row">
        <div style={{flex:1}}>
          <label htmlFor="occasion">Occasion</label>
          <select id="occasion" name="occasion" value={form.occasion} onChange={e=>setForm({...form,occasion:e.target.value})}>
            <option>None</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Business</option>
          </select>
        </div>
      </div>

      {errors.submit && <div role="alert" className="error">{errors.submit}</div>}

      <div style={{marginTop:'1rem'}}>
        <button type="submit">Confirm Booking</button>
      </div>
    </form>
  );
}