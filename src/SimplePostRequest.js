import React, { useState } from 'react';
import axios from 'axios';

const SimplePostRequest = () => {
  const [jwtToken, setJwtToken] = useState('');
  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    setJwtToken(e.target.value);
  };

  const handlePostRequest = () => {
    axios.post('https://keep-jwt-test.aks1.eastus.azure.cratedb-dev.net:4200/_sql', {"stmt":"Select 1;"}, {
        headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
    .then((res) => {
      setResponse(res.data);
    })
    .catch((error) => {
      console.error('Error making POST request', error);
      setResponse('Error making POST request');
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple POST Request with JWT</h1>
      <div>
        <input
          type="text"
          placeholder="Enter JWT Token"
          value={jwtToken}
          onChange={handleInputChange}
          style={{ padding: '10px', width: '300px' }}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePostRequest} style={{ padding: '10px 20px' }}>
          Send POST Request
        </button>
      </div>
      {response && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <strong>Response:</strong> {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
};

export default SimplePostRequest;
