import React, { useState } from 'react';

const YearPicker = ({ onChange }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 15 }, (_, index) => currentYear - index); // Display 10 years

    const [selectedYear, setSelectedYear] = useState(currentYear);

    const handleYearChange = (e) => {
        const year = parseInt(e.target.value, 10);
        setSelectedYear(year);
        onChange(`${year}`);
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
            } value={selectedYear} onChange={handleYearChange}>
                <option value="">Select Year</option>
                {years.map((year, index) => (
                    <option key={index} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default YearPicker;
