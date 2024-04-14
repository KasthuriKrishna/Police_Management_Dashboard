import React, { useState,useEffect } from 'react';
import'./Form.css'
import { useNavigate } from 'react-router-dom';
import { useMessage2 } from '../MessageContext2';
import TableComponent from './Newcases';
const FormComponent = () => {
  const [message2,setMessage2]=useState('');
  const{addMessage2}=useMessage2();
  const [formData, setFormData] = useState({
    District_Name: '',
    UnitName: '',
    FIRNo: '',
    RI: '',
    Year: '',
    Month: '',
    Offence_From_Date: '',
    Offence_To_Date: '',
    FIR_Reg_DateTime: '',
    FIR_Date: '',
    FIR_Type: '',
    FIR_Stage: '',
    Complaint_Mode: '',
    CrimeGroup_Name: '',
    CrimeHead_Name: '',
    Latitude: '',
    Longitude: '',
    ActSection: '',
    IOName: '',
    KGID: '',
    IOAssigned_Date: '',
    Internal_IO: '',
    'Place_of_Offence': '',
    'Distance_from_PS': '',
    Beat_Name: '',
    Village_Area_Name: '',
    Male: '',
    Female: '',
    Boy: '',
    Girl: '',
    'Age_0': '',
    'VICTIM_COUNT': '',
    Accused_Count: '',
    'Arrested_Male': '',
    'Arrested_Female': '',
    'Arrested_Count_No': '',
    'Accused_ChargeSheeted_Count': '',
    'Conviction_Count': '',
    FIR_ID: '',
    Unit_ID: '',
    Crime_No: ''
  });
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve message2 from localStorage on component mount
    const storedMessage = localStorage.getItem('message2');
    if (storedMessage) {
      setMessage2(storedMessage);
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleback=()=>{
    navigate('/InspectorDashboard');
}
const alertmsg=(e)=>{
 console.log("Success");
}
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  // Convert FormData to a plain object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  // Log the form data
  const { CrimeGroup_Name, UnitName, FIR_Date } = formDataObject;
  const newMessage = `A new ${CrimeGroup_Name} FIR filed in ${UnitName} on ${FIR_Date}`;

  try {
    const response = await fetch('http://localhost/submitFormData.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString(),
    });
    console.log('Response:', response); // Log the response
    if (response.ok) {
      const responseData = await response.json(); // Parse response body as JSON
      console.log('Response Data:', responseData); // Log the parsed JSON data
      if (responseData.success) {
        const { S_No } = responseData; // Extract S_No from response
        console.log('S_No:', S_No); // Log the retrieved S_No
        
        // Retrieve existing messages from localStorage
        const storedMessage = localStorage.getItem('message2');

        // Update the stored messages with the new message
        const updatedMessage = storedMessage ? `${newMessage} (S_No: ${S_No})\n${storedMessage}` : `${newMessage} (S_No: ${S_No})`;
        
        // Store updated messages in localStorage
        localStorage.setItem('message2', updatedMessage);

        alert('Form submitted successfully!');
        window.location.reload();
      } else {
        console.error('Error:', responseData.error); // Log the error message
      }
    } else {
      const errorMessage = await response.text(); // Extract error message from response body
      console.error('Error:', errorMessage);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div>
    <h2>ADD NEW FIR</h2>
    <div style={{marginLeft:"1300px",marginBottom:"20px"}}>
    <button onClick={handleback}>Back</button>
    </div>
    <form className="form-container" onSubmit={handleSubmit}>
    <div className="form-field">
    <label htmlFor="District_Name">District Name:</label>
    <input type="text" id="District_Name" name="District_Name" value={formData.District_Name} onChange={handleChange} />
  </div>
  <div className="form-field">
    <label htmlFor="UnitName">Unit Name:</label>
    <input type="text" id="UnitName" name="UnitName" value={formData.UnitName} onChange={handleChange} />
  </div>
  <div className="form-field">
  <label htmlFor="FIRNo">FIR No:</label>
  <input type="text" id="FIRNo" name="FIRNo" value={formData.FIRNo} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="RI">RI:</label>
  <input type="text" id="RI" name="RI" value={formData.RI} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Year">Year:</label>
  <input type="text" id="Year" name="Year" value={formData.Year} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Month">Month:</label>
  <input type="text" id="Month" name="Month" value={formData.Month} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Offence_From_Date">Offence From Date:</label>
  <input type="text" id="Offence_From_Date" name="Offence_From_Date" value={formData.Offence_From_Date} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Offence_To_Date">Offence To Date:</label>
  <input type="text" id="Offence_To_Date" name="Offence_To_Date" value={formData.Offence_To_Date} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="FIR_Reg_DateTime">FIR Reg DateTime:</label>
  <input type="text" id="FIR_Reg_DateTime" name="FIR_Reg_DateTime" value={formData.FIR_Reg_DateTime} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="FIR_Date">FIR Date:</label>
  <input type="text" id="FIR_Date" name="FIR_Date" value={formData.FIR_Date} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="FIR_Type">FIR Type:</label>
  <input type="text" id="FIR_Type" name="FIR_Type" value={formData.FIR_Type} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="FIR_Stage">FIR Stage:</label>
  <input type="text" id="FIR_Stage" name="FIR_Stage" value={formData.FIR_Stage} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Complaint_Mode">Complaint Mode:</label>
  <input type="text" id="Complaint_Mode" name="Complaint_Mode" value={formData.Complaint_Mode} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="CrimeGroup_Name">CrimeGroup Name:</label>
  <input type="text" id="CrimeGroup_Name" name="CrimeGroup_Name" value={formData.CrimeGroup_Name} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="CrimeHead_Name">CrimeHead Name:</label>
  <input type="text" id="CrimeHead_Name" name="CrimeHead_Name" value={formData.CrimeHead_Name} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Latitude">Latitude:</label>
  <input type="text" id="Latitude" name="Latitude" value={formData.Latitude} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Longitude">Longitude:</label>
  <input type="text" id="Longitude" name="Longitude" value={formData.Longitude} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="ActSection">Act Section:</label>
  <input type="text" id="ActSection" name="ActSection" value={formData.ActSection} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="IOName">IO Name:</label>
  <input type="text" id="IOName" name="IOName" value={formData.IOName} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="KGID">KGID:</label>
  <input type="text" id="KGID" name="KGID" value={formData.KGID} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="IOAssigned_Date">IO Assigned Date:</label>
  <input type="text" id="IOAssigned_Date" name="IOAssigned_Date" value={formData.IOAssigned_Date} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Internal_IO">Internal IO:</label>
  <input type="text" id="Internal_IO" name="Internal_IO" value={formData.Internal_IO} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Place_of_Offence">Place of Offence:</label>
  <input type="text" id="Place_of_Offence" name="Place_of_Offence" value={formData["Place of Offence"]} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Distance_from_PS">Distance from PS:</label>
  <input type="text" id="Distance_from_PS" name="Distance_from_PS" value={formData["Distance from PS"]} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Beat_Name">Beat Name:</label>
  <input type="text" id="Beat_Name" name="Beat_Name" value={formData.Beat_Name} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Village_Area_Name">Village Area Name:</label>
  <input type="text" id="Village_Area_Name" name="Village_Area_Name" value={formData.Village_Area_Name} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Male">Male:</label>
  <input type="text" id="Male" name="Male" value={formData.Male} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Female">Female:</label>
  <input type="text" id="Female" name="Female" value={formData.Female} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Boy">Boy:</label>
  <input type="text" id="Boy" name="Boy" value={formData.Boy} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Girl">Girl:</label>
<input type="text" id="Girl" name="Girl" value={formData.Girl} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Age_0">Age 0:</label>
<input type="text" id="Age_0" name="Age_0" value={formData["Age 0"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="VICTIM_COUNT">VICTIM COUNT:</label>
<input type="text" id="VICTIM_COUNT" name="VICTIM_COUNT" value={formData["VICTIM COUNT"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Accused_Count">Accused Count:</label>
<input type="text" id="Accused_Count" name="Accused_Count" value={formData.Accused_Count} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Arrested_Male">Arrested Male:</label>
<input type="text" id="Arrested_Male" name="Arrested_Male" value={formData["Arrested Male"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Arrested_Female">Arrested Female:</label>
<input type="text" id="Arrested_Female" name="Arrested_Female" value={formData["Arrested Female"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Arrested_Count_No">Arrested Count No:</label>
<input type="text" id="Arrested_Count_No" name="Arrested_Count_No" value={formData["Arrested_Count_No"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Accused_ChargeSheeted_Count">Accused ChargeSheeted Count:</label>
<input type="text" id="Accused_ChargeSheeted_Count" name="Accused_ChargeSheeted_Count" value={formData["Accused ChargeSheeted_Count"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Conviction_Count">Conviction Count:</label>
<input type="text" id="Conviction_Count" name="Conviction_Count" value={formData["Conviction_Count"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="FIR_ID">FIR ID:</label>
<input type="text" id="FIR_ID" name="FIR_ID" value={formData.FIR_ID} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Unit_ID">Unit ID:</label>
<input type="text" id="Unit_ID" name="Unit_ID" value={formData.Unit_ID} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Crime_No">Crime No:</label>
<input type="text" id="Crime_No" name="Crime_No" value={formData.Crime_No} onChange={handleChange} />
</div>
<div className="submit-button-container">
        <button type="submit" className="submit-button">Submit</button>
      </div>
    </form>
    <TableComponent/>
    </div>
  );
};

export default FormComponent;
