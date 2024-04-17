import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [reportName, setReportName] = useState('NoonReport');
  const [imoNumber, setImoNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReportChange = (e) => {
    setReportName(e.target.value);
  };

  const handleImoChange = (e) => {
    setImoNumber(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
        const response = await axios.post('http://localhost:3000/reports', {
            reportName,
            imoNumber,
        }, {
            responseType: 'blob'  // Important: this tells Axios to handle the response as binary data
        });

        // Create a URL for the blob object
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element to download the file
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', `${imoNumber.replace(/,/g, '_')}_${reportName}.json`);  // Name the download file as 'bigJsonData.jsn'
        document.body.appendChild(fileLink);

        // Programmatically click the link to trigger the download
        fileLink.click();

        // Clean up by removing the link element
        fileLink.parentNode.removeChild(fileLink);

        // Optional: Set a success message
        console.log('File has been downloaded.');

    } catch (error) {
        // Handle the error here
        console.error('There was an error!', error);
        window.alert("Error Occurred please check the give imos")
        
    }
    setLoading(false);
};


  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      maxWidth: "500px",
      margin: "50px auto",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    input: {
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      outline: "none",
      width: "100%",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#007BFF",
      color: "white",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background-color 0.2s",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "5px",
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <div style={styles.container}>
        <label style={styles.label} htmlFor="reportType">Report Type</label>
        <select
          id="reportType"
          value={reportName}
          onChange={handleReportChange}
          style={styles.input}
        >
          <option value="NoonReport">Noon Report</option>
          <option value="ArrivalReport">Arrival Report</option>
          <option value="DepartureReport">Departure Report</option>
          <option value="SeaPassageReport">SeaPassage Report</option>
          <option value="BorderCrossingReport">BorderCrossing Report</option>
          <option value="PositionReport">Position Report</option>
        </select>

        <label style={styles.label} htmlFor="imoNumber">IMO Number</label>
        <input
          id="imoNumber"
          type="text"
          placeholder="Enter IMO Number"
          value={imoNumber}
          onChange={handleImoChange}
          style={styles.input}
        />

        {!loading ? (
          <button
            style={styles.button}
            onClick={handleSubmit}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Send
          </button>
        ) : (
          <button
            style={styles.button}
            disabled
          >
            Loading...
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
