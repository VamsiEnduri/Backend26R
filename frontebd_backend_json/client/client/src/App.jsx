import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const api_URL = "http://localhost:4000/api";
const App = () => {
  const [editable,setEditable]=useState(false)
  const [userData, setUserData] = useState([]);
  const [adminsData, setAdminsData] = useState([]);

  const [formDetails, setFormDetails] = useState({
    name: "",
    age: "",
    role: "",
    info: "",
  });
  const handleDataChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };
  // console.log(formDetails)

  const handleSumbitFormData = async (e) => {
    e.preventDefault();
    console.log(formDetails);
    const {userId, name, age, role, info } = formDetails;
    console.log(userId)
   if(editable){
      try{
             await axios.put(`${api_URL}/${role}s/${userId}`,formDetails)
             alert(`${name} ${role} updated successfully`);
             setUserData((prev)=>prev.map((user)=>user.userId === userId ? formDetails :user))
             setAdminsData((prev)=>prev.map((user)=>user.userId === userId ? formDetails :user))
             setFormDetails({
              name: "",
              age: "",
              role: "",
              info: "",
            });

        
      }
      catch(err){
        console.log(err)
      }
   }
   else{
    try {
      await axios.post(`${api_URL}/${role}s`, {
        name,
        age,
        role,
        info,
      });
      alert(`${role} created successfully!!!!`);
      setFormDetails({
        name: "",
        age: "",
        role: "",
        info: "",
      });
    } catch (err) {
      console.log(err);
    }
   }
  };

  const getData = async (endPoint) => {
    try {
      const res = await axios.get(`${api_URL}/${endPoint}`);
      console.log(res.data);
      if (endPoint === "users") {
        setUserData(res.data);
      }

      if (endPoint === "admins") {
        setAdminsData(res.data);
      }
      //  setUserData(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (item) => {
    console.log(item);
    try {
      await axios.delete(`${api_URL}/${item.role}s/${item.userId}`);
      // setUserData((prev)=>console.log(prev))
      setUserData((vamsi) => vamsi.filter((x) => x.userId !== item.userId));
      alert(`${item.role} deleted successfully!!!`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (ChoosedEditItem) => {
    setEditable(true);
    setFormDetails({
      name: ChoosedEditItem.name,
      age: ChoosedEditItem.age,
      role: ChoosedEditItem.role,
      info: ChoosedEditItem.info,
      userId: ChoosedEditItem.userId, // Track the ID for updating
    });
  };


  return (
    <div style={{ backgroundColor: "gray" }}>
      <Form
        style={{ width: "500px", margin: "auto" }}
        onSubmit={handleSumbitFormData}
      >
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="John Doe..."
            name="name"
            value={formDetails.name}
            onChange={handleDataChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Age here"
            value={formDetails.age}
            name="age"
            onChange={handleDataChange}
            required
          />
        </Form.Group>

        <Form.Select
          className="mb-3"
          name="role"
          value={formDetails.role}
          onChange={handleDataChange}
          required
        >
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Form.Select>

        <Form.Group className="mb-3">
          <Form.Label>Info:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="info"
            value={formDetails.info}
            onChange={handleDataChange}
            required
          />
        </Form.Group>

        {/* <button>Post</button> */}
        {editable ? 
         <button>edit</button> 
      :
      <button>Post</button> 

      }

        {/* {edit ? (
          <button type="submit">edit</button>
        ) : (
          <button type="submit">post</button>
        )} */}
      </Form>

      <button onClick={() => getData("users")}>Users</button>
      <br />
      <button onClick={() => getData("admins")}>admins</button>

      {userData.length > 0 ? (
        <>
          {userData.map((x) => {
            return (
              <>
                <p>{x.name}</p>
                <button  onClick={()=>handleEdit(x)}>edit</button>
                <button onClick={() => handleDelete(x)}>delete</button>
              </>
            );
          })}
        </>
      ) : (
        "no users found in the database"
      )}

      {adminsData.length > 0 ? (
        <>
          {adminsData.map((x) => {
            return (
              <>
                <p>{x.name}</p>
                <button onClick={()=>handleEdit(x)}>edit</button>
                <button onClick={() => handleDelete(x)}>delete</button>
              </>
            );
          })}
        </>
      ) : (
        "no admins found in the database"
      )}
    </div>
  );
};

export default App;
