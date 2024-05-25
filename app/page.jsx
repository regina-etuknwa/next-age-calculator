"use client"

import Image from "next/image";
import Arrow from './icon-arrow.svg';
import { useState, useRef } from "react";

export default function Home() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [age, setAge] = useState(null);
  const [dayError, setDayError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');
  const [error, setError] = useState('');

  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  const isValidDate = (year, month, day, today) => {
    console.log('checking validity...');
    const date = new Date(year, month - 1, day);
      return (
        date.getDate() === parseInt(day) &&
        date.getFullYear() === parseInt(year) &&
        date.getMonth() === parseInt(month) - 1
      );
  };

  const isInFuture = (year, month, day, today) => {
    console.log('checking future......');
    const date = new Date(year, month - 1, day);
      return date >= today;
  }

  const handleChange = e => {
    console.log('handling change...');
    
    e.target.classList.remove('error');
    e.target.previousElementSibling.classList.remove('error-label');
    const { name, value } = e.target;
    if (name === 'year') {
      if (value === "" || value.length <= 4 && /^\d*$/.test(value)) {
        setYear(value);
        setYearError('');
      }
    } else if (name === 'month') {
      if (value === "" || value.length <= 2 && /^\d*$/.test(value)) {
        setMonth(value);
        setMonthError('');
      }
    } else {
      if (value === "" || value.length <= 2 && /^\d*$/.test(value) ) {
        setDay(value);
        setDayError('');
      }
    }
  }

  const calculateAge = e => {
    e.preventDefault();
    setError('');

    dayRef.current.classList.remove('error');
    monthRef.current.classList.remove('error');
    yearRef.current.classList.remove('error');

    dayRef.current.previousElementSibling.classList.remove('error-label');
    monthRef.current.previousElementSibling.classList.remove('error-label');
    yearRef.current.previousElementSibling.classList.remove('error-label');

    console.log('Calculating age....');
    console.log(`year:${year} , month:${month} , day:${day}`);

    if (year === '') {
      setYearError('This field is required');
      yearRef.current.classList.add('error');
      yearRef.current.previousElementSibling.classList.add('error-label');
      console.log(yearError);
    }
    if (month === '') {
      setMonthError('This field is required');
      monthRef.current.classList.add('error');
      monthRef.current.previousElementSibling.classList.add('error-label');
      console.log(monthError);
    }
    if (day === '') {
      setDayError('This field is required');
      dayRef.current.classList.add('error');
      dayRef.current.previousElementSibling.classList.add('error-label');;
      console.log(dayError);
    }

    if (year && month && day) {
      const today = new Date();
      
      if ( parseInt(month) < 1 || parseInt(month) > 12) {
        setMonthError('Please enter a valid month (1-12).');
        monthRef.current.classList.add('error');
        monthRef.current.previousElementSibling.classList.add('error-label');;
        console.log(monthError);
        return;
      }
      if(parseInt(day) < 1 || parseInt(day) > 31 ) {
        setDayError('Please enter a valid day.');
        dayRef.current.classList.add('error');
        dayRef.current.previousElementSibling.classList.add('error-label');;
        console.log(dayError);
        return;
      }
      
      if (isValidDate(year, month, day, today)) {
          if (isInFuture(year, month, day, today)) {
            setError ('Must be in the past');
            dayRef.current.classList.add('error');
            monthRef.current.classList.add('error');
            yearRef.current.classList.add('error');

            dayRef.current.previousElementSibling.classList.add('error-label');;
            monthRef.current.previousElementSibling.classList.add('error-label');;
            yearRef.current.previousElementSibling.classList.add('error-label');;
            console.log(error);
            return
          }

          const birthDate = new Date(`${year}-${month}-${day}`);
          let ageYears = today.getFullYear() - birthDate.getFullYear();
          let ageMonths = today.getMonth() - birthDate.getMonth();
          let ageDays = today.getDate() - birthDate.getDate();
    
          if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
            ageYears--;
            ageMonths += 12;
          }
    
          if (ageDays < 0) {
            const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            ageDays += prevMonthLastDay;
            ageMonths--;
          }
    
          setAge({ years: ageYears, months: ageMonths, days: ageDays });

        } else {
          setError('Please enter a valid date.')
          console.log(error);
          return;
        }
      }
  }

  return (
    <main className="w-full md:w-3/4 m-auto mt-6 md:mt-0 p-10 bg-white rounded-lg rounded-ee-4xl">
      <form className="w-full" onSubmit={calculateAge}>
        <div className="flex gap-3 mb-3">
          <div className="flex flex-col w-full">
            <label htmlFor="day">DAY</label>
            <input type="text" name="day" id="day" placeholder="DD" value={day} onChange={handleChange} ref={dayRef} />
            {dayError && <p className="error-text">{dayError}</p>}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="month">MONTH</label>
            <input type="text" name="month" id="month" placeholder="MM" value={month} onChange={handleChange} ref={monthRef}/>
            {monthError && <p className="error-text">{monthError}</p>}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="year">YEAR</label>
            <input type="text" name="year" id="year" placeholder="YYYY" value={year} onChange={handleChange} ref={yearRef}/>
            {yearError && <p className="error-text">{yearError}</p>}
          </div>
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="w-full flex justify-center md:justify-end my-5 md:m-0">
          <button type="submit" >
            <Image 
              src={Arrow}
              alt="Submit"
              className="bg-primary p-3 rounded-full hover:bg-black"
            />
          </button>
        </div>
      </form>

      {!age && <div>
        <p className="age-text"><span className="text-primary" id="years">--</span> years</p>
        <p className="age-text"><span className="text-primary" id="months">--</span> months</p>
        <p className="age-text"><span className="text-primary" id="days">--</span> days</p>
      </div>}
      {age && <div>
        <p className="age-text"><span className="text-primary" id="years">{age.years}</span> years</p>
        <p className="age-text"><span className="text-primary" id="months">{age.months}</span> months</p>
        <p className="age-text"><span className="text-primary" id="days">{age.days}</span> days</p>
      </div>}
    </main>
  );
}
