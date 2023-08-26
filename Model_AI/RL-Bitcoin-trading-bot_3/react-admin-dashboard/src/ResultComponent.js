import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const ResultComponent = () => {
    const [result, setResult] = useState(null);
    const [showModal, setShowModal] = useState(false); // Add state for modal visibility

    const handleRunResult = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5001/get_result'); // Update the URL to match your Flask route
            setResult(response.data.result);
            setShowModal(true); // Show modal on successful result retrieval
        } catch (error) {
            console.error('Error retrieving result:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close modal when close button is clicked
    };

    return (
        <div style={{ backgroundColor: '#f8f8f8', padding: '20px' }}>
            <h1>Result Component</h1>
            <button onClick={handleRunResult}>Run Result</button>
            {result && showModal && ( // Render modal when result is available and showModal is true
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        padding: '20px',
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                        zIndex: 999
                    }}
                >
                    <h2>Result:</h2>
                    <Bar
                        data={{
                            labels: result.labels,
                            datasets: [
                                {
                                    label: 'Your Chart Label',
                                    data: result.data,
                                    backgroundColor: 'rgba(75,192,192,0.2)',
                                    borderColor: 'rgba(75,192,192,1)',
                                    borderWidth: 1
                                }
                            ]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                    <button
                        onClick={handleCloseModal}
                        style={{
                            marginTop: '20px',
                            backgroundColor: '#007bff',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                    {/* Add close button to modal */}
                </div>
            )}
        </div>
    );
};

export default ResultComponent;
