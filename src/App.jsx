import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function App(){
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  //<---------------------To fetch data from API----------------------->
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //<--------------------- Below function are to Open & Close the modal----------------------->
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-4 container">
      <h4 className="text-center text-light bg-success p-2 mt-2">All Users List</h4>
      <table className="table table-bordered table-striped table-dark table-hover table-responsive-sm mt-2">
        <thead>
          <tr>
            <th className="text-center p-3 fs-5" style={{ fontFamily: 'verdana' }}>Name</th>
            <th className="text-center p-3 fs-5" style={{ fontFamily: 'verdana' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="text-center">{user.name}</td>
              <td className="text-center">
                <button
                  onClick={() => openModal(user)}
                  className="btn btn-success"
                >
                  Show Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          position: 'absolute'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            color: 'black',
            p: 2,
            borderRadius: '8px',
            maxWidth: '80vw',
            maxHeight: '80vh',
            overflowY: 'auto',
            textAlign: 'center'
          }}
        >
          <Button
            sx={{
              position: 'absolute',
              top: '2%',
              right: '0%',
              outline:'none',
              border:'none',
              '&:hover': {
                backgroundColor: 'transparent',
              }
            }}
            onClick={closeModal}
          >
            <HighlightOffIcon></HighlightOffIcon>
          </Button>
          <Typography variant="h6" component="h2" id="name" sx={{ fontFamily: 'cursive', color: 'red', fontSize: '35px', fontWeight: "bold" }}>
            {selectedUser?.name}
          </Typography>
          <Typography id="email" sx={{ mt: 1, fontFamily: 'sans-serif', color: 'green', fontSize: '20px', fontWeight: 'bold' }}>
            <EmailIcon sx={{ color: "black", fontSize: "20px" }} /> Email: {selectedUser?.email}
          </Typography>
          <Typography sx={{ mb: 2, fontFamily: 'sans-serif', color: 'green', fontSize: '17px', fontWeight: 'bold' }}>
            <PhoneIcon sx={{ color: "black", fontSize: "20px" }} /> Phone: {selectedUser?.phone}
          </Typography>
          <img
            src={`https://via.placeholder.com/200?text=${selectedUser?.name}`}
            alt={selectedUser?.name}
          />
        </Box>
      </Modal>
    </div>
  );
};


