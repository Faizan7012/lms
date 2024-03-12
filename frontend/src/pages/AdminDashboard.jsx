import { Box, Heading, Text  , Button, Input, SimpleGrid, Flex, VStack} from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { AuthContext } from '../context/user';

const baseUrl = 'https://magnificent-bat-sandals.cyclic.app'
const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [newCourse, setNewCourse] = useState({
    name: '',
    description: ''
  });
  const {token} = useContext(AuthContext)


  const [updatingCourse, setUpdatingCourse] = useState({
    _id: '',
    name: '',
    description: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/course/getAllCourses`, {
          headers: {
            'Content-Type': 'application/json',
            "token": `${token}`
          },
        });
        const data = await response.json();
        if (response.ok) {
          setCourses(data.courses);
        }
      } catch (error) {
        console.log(error);
        alert(error)
      }
    };

    fetchCourseDetails();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/course/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "token": `${token}`
        },
        body: JSON.stringify(newCourse)
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setCourses(prevCourses => [...prevCourses, data.newCourse]);
        setIsCreating(false);
        setNewCourse({
            name: '',
            description: ''
          });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`${baseUrl}/course/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "token": `${token}`
        }
      });
      const data = await response.json();
      console.log(response)
      console.log(data)
      if (response.ok) {
        alert(data.message);
        setCourses(prevCourses =>
          prevCourses.filter(course => course._id !== courseId)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error);
    }
  };

 

  const handleUpdateClick = (course) => {
    setIsUpdating(!isUpdating);
    setUpdatingCourse(course);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/course/${updatingCourse._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "token": `${token}`
        },
        body: JSON.stringify(updatingCourse)
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setCourses(prevCourses =>
          prevCourses.map(course =>
            course._id === updatingCourse._id ? updatingCourse : course
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

  const filteredCourses = courses.filter(course => {
    return course.name.toLowerCase().includes(searchQuery.toLowerCase()) || course.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Box>
      <Box>
        <Text>Total Courses: {courses.length}</Text>
      </Box>
      <VStack>
        <Input
        w='300px'
        m='auto'
          type="text"
          placeholder="Search Course"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button mb='10px' onClick={() => setIsCreating(!isCreating)}>Add New Course</Button>
      </VStack>
      {isCreating && (
        <Box >
          <form onSubmit={handleCreateCourse}>
            <Input  w='300px' m='auto' mr='5px' type="text" placeholder='name' name="name" value={newCourse.name} onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} />
            <Input  w='300px' m='auto' mr='5px' type="text" placeholder='description' name="description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
            <Button type="submit">Create</Button>
            <span
            style={{fontFamily:'monospace' , fontSize:'25px' , fontWeight:'bolder' , marginLeft:'10px',background:'red',borderRadius:'5px', padding:'3px 20px'}}
             type="button" onClick={()=>setIsCreating(false)}>X</span>
          </form>
        </Box>
      )}
      {isUpdating && (
        <Box >
          <form onSubmit={handleUpdateCourse}>
            <Input w='300px' m='auto' mr='5px' type="text" name="name" value={updatingCourse.name} onChange={(e) => setUpdatingCourse({ ...updatingCourse, name: e.target.value })} />
            <Input w='300px' m='auto' mr='5px' type="text" name="description" value={updatingCourse.description} onChange={(e) => setUpdatingCourse({ ...updatingCourse, description: e.target.value })} />
            <Button type="submit">Submit</Button>
            <span style={{fontFamily:'monospace' , fontSize:'25px' , fontWeight:'bolder' , marginLeft:'10px',background:'red',borderRadius:'5px', padding:'3px 20px'}} onClick={()=>setIsUpdating(false)}>X</span>
          </form>
        </Box>
      )}
      <SimpleGrid columns = {['1','2','3','4']} gap='20px' w='95%' m='auto' mt='30px'>
        {filteredCourses.map(course => (
          <Box key={course._id} p='30px'  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
          <Link  to={`/Course/${course._id}`}>
            <Heading fontFamily='mono' fontSize={'20px'} mb='10px'>{course.name}</Heading>
            <Text fontFamily='mono' fontWeight={'500'}>{course.description}</Text>
            <Text fontFamily='mono' fontWeight={'500'}>Total Lectures: {course.lectures.length}</Text>
          </Link>
            <Flex  gap='20px' flexWrap='wrap' justifyContent='center' mt='20px'>
              <Button fontFamily='mono' bg='green' color='white' onClick={() => handleUpdateClick(course)}>Update</Button>
              <Button fontFamily='mono' bg='red' color='white'  onClick={() => handleDeleteCourse(course._id)}>Delete</Button>
              {/* <Button fontFamily='mono' bg='blue' color='white' >Join Course</Button> */}
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

    </Box>
  );
};

export default AdminDashboard;