import React, { useState } from 'react';
import CourseRegistrationContract from '../contracts/CourseRegistration.json';
import "./form.css"

const RegistrationForm = ({ web3 }) => {
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const abi = CourseRegistrationContract.abi;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(abi, '0xA83bBe35e369814F45f8E8b51f847a9f6ac52CF9');
      
      await contract.methods.register(name, usn, branch, semester, courseName).send({ from: accounts[0] });
      
      alert('Registration Successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Register for the Course</h2>
      <form onSubmit={handleSubmit}>
        <label className="label">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" />
        </label>
        <label className="label">
          USN:
          <input type="text" value={usn} onChange={(e) => setUsn(e.target.value)} className="input" />
        </label>
        <label className="label">
          Branch:
          <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} className="input" />
        </label>
        <label className="label">
          Semester:
          <input type="number" value={semester} onChange={(e) => setSemester(e.target.value)} className="input" />
        </label>
        <label className="label">
          Course Name:
          <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} className="input" />
        </label>
        <button type="submit" disabled={loading} className="button">Register</button>
        {loading && <p className="loading">Loading...</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
