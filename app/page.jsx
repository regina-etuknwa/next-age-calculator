"use client"

import Image from "next/image";
import Arrow from './icon-arrow.svg';
import { useState } from "react";

export default function Home() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');

  const isValidDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === parseInt(year) &&
      date.getMonth() === parseInt(month) - 1 &&
      date.getDate() === parseInt(day)
    );
  };
  

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'year') {
      if (value.length <= 4 && /^\d+$/.test(value)) {
        setYear(value);
        setError('');
      } else {
        setError('Please enter a valid year.');
        console.log(error);
      }
    } else if (name === 'month') {
      if (value.length <= 2 && /^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 12) {
        setMonth(value);
        setError('');
      } else {
        setError('Please enter a valid month (1-12).');
        console.log(error);
      }
    } else {
      if (
        value.length <= 2 &&
        /^\d+$/.test(value) &&
        parseInt(value) >= 1 &&
        parseInt(value) <= 31 &&
        isValidDate(year, month, value)
      ) {
        setDay(value);
        setError('');
      } else {
        setError('Please enter a valid day.');
        console.log(error);
      }
    }
  }

  const calculateAge = e => {
    e.preventDefault();
    if (year && month && day) {
      const today = new Date();
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
      setError('Please enter all fields.');
      console.log(error);
    }
  }

  return (
    <main className="w-3/4 m-auto p-10 bg-white rounded-lg rounded-ee-4xl">
      <form className="w-full" onSubmit={calculateAge}>
        <div className="flex gap-3 mb-3">
          <div className="flex flex-col w-full">
            <label htmlFor="day">DAY</label>
            <input type="text" name="day" id="day" placeholder="DD" value={day} onChange={handleChange} />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="month">MONTH</label>
            <input type="text" name="month" id="month" placeholder="MM" value={month} onChange={handleChange}/>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="year">YEAR</label>
            <input type="text" name="year" id="year" placeholder="YYYY" value={year} onChange={handleChange}/>
          </div>
        </div>
        <div className="w-full flex justify-end">
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
        <p className="text-7xl font-bold"><span className="text-primary" id="years">--</span> years</p>
        <p className="text-7xl font-bold"><span className="text-primary" id="months">--</span> months</p>
        <p className="text-7xl font-bold"><span className="text-primary" id="days">--</span> days</p>
      </div>}
      {age && <div>
        <p className="text-7xl font-bold"><span className="text-primary" id="years">{age.years}</span> years</p>
        <p className="text-7xl font-bold"><span className="text-primary" id="months">{age.months}</span> months</p>
        <p className="text-7xl font-bold"><span className="text-primary" id="days">{age.days}</span> days</p>
      </div>}
    </main>
  );
}
