import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/user';
import { Box, Button, Flex, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react';
const baseUrl = 'https://magnificent-bat-sandals.cyclic.app'

const Lecture = () => {
  const params = useParams();
  const courseId = params.id;
  const {token , user} = useContext(AuthContext)
  const [lectures, setLectures] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newLecture, setNewLecture] = useState({
    course: courseId,
    title: "",
    startTime: "",
    duration: "",
    description: ""
  });
  const [updatingLecture, setUpdatingLecture] = useState({
    _id: '',
    course: courseId,
    title: "",
    startTime: "",
    duration: "",
    description: ""
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/course/${courseId}/lectures`, {
          headers: {
            'Content-Type': 'application/json',
            "token": `${token}`
          },
        });
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setLectures(data.lectures);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleCreateLecture = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/lecture/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "token": `${token}`
        },
        body: JSON.stringify(newLecture)
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setLectures(prevLectures => [...prevLectures, data.newLecture]);
        setIsCreating(!isCreating);
        setNewLecture({
          course: courseId,
          title: "",
          startTime: "",
          duration: "",
          description: ""
          });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error);
    }
  };

  const handleDeleteLecture = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/lecture/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "token": `${token}`
        }
      });
      const data = await response.json();
      alert('deleted successfully');
      setLectures(prevLectures =>
        prevLectures.filter(lecture => lecture._id !== id)
      );
    } catch (error) {
      console.error('Error:', error);
      alert(error);
    }
  };

  const handleCancelCreate = () => {
    setIsCreating(!isCreating);
    setNewLecture({
      title: '',
      description: ''
    });
  };

  const handleCancelUpdate = () => {
    setIsUpdating(!isUpdating);
  };

  const handleUpdateClick = (lecture) => {
    setIsUpdating(!isUpdating);
    setUpdatingLecture(lecture);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/lecture/${updatingLecture._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "token": `${token}`
        },
        body: JSON.stringify(updatingLecture)
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setLectures(prevLectures =>
          prevLectures.map(lecture =>
            lecture._id === updatingLecture._id ? updatingLecture : lecture
          )
        );
        setIsUpdating(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error);
    }
  };

  const filteredLectures = lectures.filter(lecture => {
    return lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lecture.description.toLowerCase().includes(searchQuery.toLowerCase())
  });
  return (
    <Box>
      <Box>
        <Text>Total Lectures: {filteredLectures.length}</Text>
        <Input
        w='300px'
        m='auto'
          type="text"
          placeholder="Search Lecture"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <Button display={user.role==='admin' ? 'block':'none'} mt='10px' mb='10px' onClick={() => setIsCreating(!isCreating)}>Add New Lecture</Button>
      {isCreating && (
        <Box m='auto' mt='30px' w='300px' fontWeight={'500'} fontFamily={'monospace'} p='10px' borderRadius={'5px'}  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
          <form onSubmit={handleCreateLecture}>
            <Input mt='5px' required type="text" placeholder='title' name="title" value={newLecture.title} onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })} />
            <Input mt='5px' required type="text" placeholder='description' name="description" value={newLecture.description} onChange={(e) => setNewLecture({ ...newLecture, description: e.target.value })} />
            <Input mt='5px' required type="date" placeholder='startTime' name="startTime" value={newLecture.startTime} onChange={(e) => setNewLecture({ ...newLecture, startTime: e.target.value })} />
            <Input mt='5px' required type="text" placeholder='duration' name="duration" value={newLecture.duration} onChange={(e) => setNewLecture({ ...newLecture, duration: e.target.value })} />
            <Button type="submit">Create</Button>
            <span
             style={{fontFamily:'monospace' , fontSize:'25px' , fontWeight:'bolder' , marginLeft:'10px',background:'red',borderRadius:'5px', padding:'3px 20px'}}
             className="cancel-icon" type="button" onClick={handleCancelCreate}>X</span>
          </form>
        </Box>
      )}
      {isUpdating && (
        <Box 
        
        m='auto' mt='30px' w='300px' fontWeight={'500'} fontFamily={'monospace'} p='10px' borderRadius={'5px'}  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
          <form onSubmit={handleUpdateCourse}>
            <Input type="text" placeholder='title' name="title" value={updatingLecture.title} onChange={(e) => setUpdatingLecture({ ...updatingLecture, title: e.target.value })} />
            <Input type="text" placeholder='description' name="description" value={updatingLecture.description} onChange={(e) => setUpdatingLecture({ ...updatingLecture, description: e.target.value })} />
            <Input type="date" placeholder='startTime' name="startTime" value={updatingLecture.startTime} onChange={(e) => setUpdatingLecture({ ...updatingLecture, startTime: e.target.value })} />
            <Input type="text" placeholder='duration' name="duration" value={updatingLecture.duration} onChange={(e) => setUpdatingLecture({ ...updatingLecture, duration: e.target.value })} />
            <Button type="submit">Submit</Button>
            <span
             style={{fontFamily:'monospace' , fontSize:'25px' , fontWeight:'bolder' , marginLeft:'10px',background:'red',borderRadius:'5px', padding:'3px 20px'}}
             className="cancel-icon" onClick={handleCancelUpdate}>X</span>
          </form>
        </Box>
      )}
       <SimpleGrid columns = {['1','2','3','4']} gap='20px' w='95%' m='auto' mt='30px'>
        {filteredLectures?.map(lecture => (
          <Box key={lecture._id} 
          m='auto' mt='30px' w='300px' fontWeight={'500'} fontFamily={'monospace'} p='10px' borderRadius={'5px'}  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
            <Heading fontSize={'25px'}>{lecture.title}</Heading>
            <Text>{lecture.description}</Text>
            <Text>{new Date(lecture.startTime).toLocaleDateString()}</Text>
            <Text>{lecture.duration}</Text>
            <Flex gap='10px' justifyContent={'center'} mt='20px'>
            <Button color='white' bg='green' display={user.role==='admin' ? 'block':'none'} onClick={() => handleUpdateClick(lecture)}>Update</Button>
            <Button color='white' bg='red' display={user.role==='admin' ? 'block':'none'} onClick={() => handleDeleteLecture(lecture._id)}>Delete</Button>
            </Flex>
          </Box>
        ))}
    </SimpleGrid>

      </Box>
  );
};

export default Lecture;