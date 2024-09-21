import React from 'react';
import './ProgressDial.css';

export default function ProgressDial({ label, unit, value, maxValue }) {
  let percent = ((value / maxValue) * 100).toPrecision(3);
  return (
    <div class="card">
      <div class="percent">
        <svg>
          <circle cx="105" cy="105" r="100"></circle>
          <circle
            cx="105"
            cy="105"
            r="100"
            style={{
              '--percent':
                percent <= 0 ? 0 : percent > 0 && percent < 100 ? percent : 100,
              display: percent <= 0 ? 'none' : 'block',
            }}
          ></circle>
        </svg>
        <div class="number">
          <h3>
            {value <= 0 ? 0 : value > 0 && value < maxValue ? value : maxValue}
            <span>{unit}</span>
          </h3>
        </div>
      </div>
      <div class="title">
        <h2>{label}</h2>
      </div>
    </div>
  );
}

ProgressDial.defaultProps = {
  label: 'Progress',
  unit: '%',
  value: 35,
  maxValue: 100,
};
