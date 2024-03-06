

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// CSS styles
const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  minHeight: '100vh',
  background: 'linear-gradient(45deg, #FF8E53, #FE6B8B, #FF8E53)',
  backgroundSize: '300% 300%',
  animation: 'gradient 15s ease infinite',
  color: '#fff',
  padding: '2rem',
};

const headerStyles = {
  textAlign: 'center',
  marginBottom: '2rem',
};

const tableStyles = {
  borderCollapse: 'collapse',
  width: '100%',
  backgroundColor: '#fff',
  color: '#333',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
};

const thTdStyles = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const statusStyles = {
  active: { color: 'green' },
  inactive: { color: 'red' },
  pending: { color: 'orange' },
};

// PDF document styles
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Gradient animation
const gradientAnimation = `
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('http://localhost:5000/table')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleShowDetails = (description) => {
    // Use ReactPDF to show details in a PDF
    const details = (
      <Document>
        <Page style={pdfStyles.page}>
          <View style={pdfStyles.section}>
            <Text>{description}</Text>
          </View>
        </Page>
      </Document>
    );

    // Open PDF viewer
    // Implement the PDF viewer component according to your project structure
  };

  return (
    <div style={containerStyles}>
      <style>{gradientAnimation}</style>
      <header style={headerStyles}>
        <h1> Business Automation User Table</h1>
        <p>This table displays user information, including name, email, status, and description.</p>
      </header>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thTdStyles}>Username</th>
            <th style={thTdStyles}>Email</th>
            <th style={thTdStyles}>Status</th>
            <th style={thTdStyles}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td style={thTdStyles}>{item.userName}</td>
              <td style={thTdStyles}>{item.email}</td>
              <td style={{ ...thTdStyles, ...statusStyles[item.status] }}>
                {item.status}
              </td>
              <td style={thTdStyles}>
                <button onClick={() => handleShowDetails(item.description)}>
                  Show Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;