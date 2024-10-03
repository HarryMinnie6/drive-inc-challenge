import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function SelectorBar ({ data, setFunction, dataType }) {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const buttonStyle = {
    flex: '1',
    borderRadius: '0',
    transition: 'background-color 0.3s ease',
    color: 'black'
  };

  return (
    <>
      <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        <Button
          style={{
            ...buttonStyle,
            backgroundColor: hoveredLocation === '' ? '#DEDEDE' : '#F3F4F5',
          }}
          onClick={() => setFunction('')}
          onMouseEnter={() => setHoveredLocation('')}
          onMouseLeave={() => setHoveredLocation(null)}>
          All {dataType}
        </Button>
        {data?.map((location) => (
          <Button
            key={location}
            style={{
              ...buttonStyle,
              backgroundColor: hoveredLocation === location ? '#DEDEDE' : '#F3F4F5',
            }}
            onClick={() => setFunction(location)}
            onMouseEnter={() => setHoveredLocation(location)}
            onMouseLeave={() => setHoveredLocation(null)}
          >
            {location}
          </Button>
        ))}
      </Box>
    </>
  );
}
export default SelectorBar
;