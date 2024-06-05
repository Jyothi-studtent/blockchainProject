import React, { useState, useEffect } from 'react';
import CourseRegistrationContract from '../contracts/CourseRegistration.json';
import "./table.css"

const RegistrationsTable = ({ web3 }) => {
  const [registrations, setRegistrations] = useState([]);
  const [registrationsCount, setRegistrationsCount] = useState(0);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const contract = new web3.eth.Contract(CourseRegistrationContract.abi, '0xA83bBe35e369814F45f8E8b51f847a9f6ac52CF9');
        
        // Get the total registration count
        const count = await contract.methods.registrationsCount().call();
        console.log("object",count)
        setRegistrationsCount(count);

        
        const registrationPromises = [];
        for (let i = 0; i < count; i++) {
          registrationPromises.push(contract.methods.getRegistration(i).call());
        }
        
        // Retrieve registration details for each index
        const registrationResults = await Promise.all(registrationPromises);

        // Update state with fetched registration details
        setRegistrations(registrationResults);
      } catch (error) {
        console.error('Failed to fetch registrations:', error);
      }
    };

    fetchRegistrations();
  }, [web3]);

  return (
    <div className="registrations-container">
    <h2>Registrations</h2>
    <p>Total Registrations: {registrationsCount}</p>
    <table className="table">
      <thead>
        <tr>
          
          <th>Name</th>
          <th>USN</th>
          <th>Branch</th>
          <th>Semester</th>
          <th>Course Name</th>
          <th>Registration Date</th>
        </tr>
      </thead>
      <tbody>
        {registrations.map((registration, index) => (
          <tr key={index}>
            {/* <td>{registration.studentAddress}</td> */}
            <td>{registration.name}</td>
            <td>{registration.usn}</td>
            <td>{registration.branch}</td>
            <td>{registration.semester}</td>
            <td>{registration.courseName}</td>
            <td>{new Date(registration.registrationDate * 1000).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default RegistrationsTable;
