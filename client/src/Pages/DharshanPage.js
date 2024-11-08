import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const DharshanPage = () => {
  const [dharshanData, setDharshanData] = useState([]);
  const [newDharshan, setNewDharshan] = useState({ name: '', poojaTime: '' });

  useEffect(() => {
    fetchDharshan();
  }, []);

  const fetchDharshan = async () => {
    try {
      const response = await axios.get('/api/dharshan');
      setDharshanData(response.data);
    } catch (error) {
      console.error('Failed to fetch Dharshan data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDharshan({ ...newDharshan, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/dharshan', newDharshan);
      fetchDharshan();
      setNewDharshan({ name: '', poojaTime: '' });
    } catch (error) {
      console.error('Failed to create Dharshan:', error);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Dharshan Management</h1>
        <div style={styles.card}>
          <h2 style={styles.formTitle}>Create New Dharshan</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={newDharshan.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Pooja Time:</label>
              <input
                type="text"
                name="poojaTime"
                value={newDharshan.poojaTime}
                onChange={handleInputChange}
                placeholder="Enter pooja time"
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Create Dharshan</button>
          </form>
        </div>
        <div style={styles.card}>
          <h2 style={styles.subtitle}>All Dharshans</h2>
          <ul style={styles.list}>
            {dharshanData.map((dharshan) => (
              <li key={dharshan.id} style={styles.listItem}>
                {dharshan.name} - {dharshan.poojaTime}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#FFA500',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center', // Center text in the container
  },
  title: {
    color: '#fff',
    marginBottom: '20px',
  },
  card: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center form elements
  },
  formTitle: {
    marginBottom: '15px',
    fontSize: '20px',
    color: '#fff',
  },
  inputGroup: {
    marginBottom: '15px',
    width: '100%', // Make input groups full width for better layout
    maxWidth: '400px', // Limit input group width
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'left', // Align label to the left
  },
  input: {
    width: '100%', // Make input full width
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    transition: 'border 0.3s',
  },
  button: {
    padding: '10px',
    backgroundColor: '#FFA500',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  subtitle: {
    marginTop: '20px',
    color: '#555',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    color: '#333',
  },
  body: {
    backgroundColor: '#FFA500',
  },
};

export default DharshanPage;
