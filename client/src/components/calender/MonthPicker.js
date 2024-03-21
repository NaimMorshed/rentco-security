import React, { useState } from 'react'

export default function MonthPicker({onChange}) {
    const [selectedMonth, setSelectedMonth] = useState('');

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const handleMonthChange = (e) => {
        const month = e.target.value;
        setSelectedMonth(month);
    };
  return (
      <div>
          <select style={
              {
              outline: 'none',
              border: 'none',
              backgroundColor: '#F3F2F3',
              padding: '5px 15px',
              borderRadius: '5px'
            }
          } value={selectedMonth} onChange={handleMonthChange}>
              <option value="">Select Month</option>
              {months.map((month, index) => (
                  <option key={index} value={month}>
                      {month}
                  </option>
              ))}
          </select>
    </div>
  )
}
