import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import customStyles from "react-data-table-component";
import "./App.css";
import "./index.css";


function App() {
  const [loadingData, setLoadingData] = useState(true);

  const columns = [
    {
      name: "Identification",
      selector: row => row.Identification,
      width: '150px',
    },
    {
      name: "Sequence Number",
      selector: row => row.SequenceNumber,
      width: '150px',
    },
    {
      name: "Name",
      selector: row => row.Name,
      width: '150px',
    },
    {
      name: "Type",
      selector: row => row.Type,
      width: '150px',
    },
    {
      name: "Photo",
      selector: row => <img height="30px" width="30px" alt={row.Identification} src={row.Photo} />,
      width: '150px',
    },
    {
      name: "Customer Segment",
      selector: row => row.CustomerSegment,
      cell: (d) => <span>{d.CustomerSegment.join(", ")}</span>,
      width: '150px',

    },
    {
      name: "Service and Facility",
      selector: row => row.ServiceAndFacility,
      cell: (d) => <span>{d.ServiceAndFacility.join(", ")}</span>,
      width: '210px',
    },
    {
      name: "Accessibility",
      selector: row => row.Accessibility,
      cell: (d) => <span>{d.Accessibility.join(", ")}</span>,
      width: '150px',
      
    },
    { 
      name: "Other Service and Facility",
      selector: row =>  row.OtherServiceAndFacility,
      cell: (d) => <span>{d.OtherServiceAndFacility && d.OtherServiceAndFacility.map(item =>  item.Name).join(", ")} {d.OtherServiceAndFacility && d.OtherServiceAndFacility.map(item => item.Description).join(", ")}</span> ,
      width: '150px',
    },
    { 
      name: "Availability",
      selector: row =>  row.Availability,
      cell: (d) => <span>{ d.Availability.StandardAvailability.Day.map(item => item.Name).join(": ")} </span>,
      width: '110px',
      
    },

    { 
      name: "Opening Times",
      selector: row =>  row.Availability,
      cell: (d) => <span>  { d.Availability.StandardAvailability.Day.map(item => item.OpeningHours[0].OpeningTime).join(", ")}</span>,
      width: '110px'
    },

    { 
      name: "Closing Times",
      selector: row =>  row.Availability,
      cell: (d) => <span>  { d.Availability.StandardAvailability.Day.map(item => item.OpeningHours[0].ClosingTime).join(", ")}</span>,
      width: '100px',
    
    },
  
    {
      name: "Contact Info",
      selector: row => row.ContactInfo,
      cell: (d) => <span>{d.ContactInfo && d.ContactInfo.map(item => item.ContactDescription)} {d.ContactInfo && d.ContactInfo.map(item => item.ContactContent)}</span>,
      width: '200px',
    },
    
    {
      name: "Postal Address",
      selector: row => row.PostalAddress,
      cell: (d) => <span>{ d.PostalAddress.CountrySubDivision.map(item => item.CountrySubDivision).join(", ")}</span>,
      width: '150px'
    },
    
    
    
  ];
  

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .get("https://cors-anywhere.herokuapp.com/https://atlas.api.barclays/open-banking/v2.2/branches")
        .then((response) => {
          console.log(response.data.data[0].Brand[0].Branch);
          setData(response.data.data[0].Brand[0].Branch);
          setLoadingData(false);
        });
    }
    if (loadingData) {
      getData();
    }
  }, []);
  

  return (
    <div className="App">
      {loadingData ? (
        <p>Loading...Please wait</p>
      ) : (
        <DataTable title= "Barclays UK" 
        columns={columns} 
        data={data} 
        customStyles={customStyles}
        pagination
        fixedHeader
        selectableRows
        theme="dark"
        dense/>
      )}
    </div>
  );
}

export default App;