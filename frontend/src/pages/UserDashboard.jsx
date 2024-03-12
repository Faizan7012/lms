import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/user'
import { Box, Button, Flex, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const baseUrl = 'https://magnificent-bat-sandals.cyclic.app';


const UserDashboard = () => {
  const {token , user} = useContext(AuthContext);
  const [myCourse , setMyCourse] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(()=>{
      async function getMyCourses(){
        try {
          const response = await fetch(`${baseUrl}/user/getcourses/${user._id}`, {
            headers: {
              'Content-Type': 'application/json',
              "token": `${token}`
            },
          });
          const data = await response.json();
          setMyCourse(data.courses)
        } catch (error) {
          alert(error.message)
          console.log(error)
        }

      }
      getMyCourses();
  },[])



  const filteredCourses = myCourse.filter(course => {
    return course.name.toLowerCase().includes(searchQuery.toLowerCase()) || course.description.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return (
    <Box>
         <Heading>My Courses</Heading>
         <Input
        w='300px'
        m='auto'
        mt='20px'
        mb='20px'
          type="text"
          placeholder="Search Course"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
       <SimpleGrid columns = {['1','2','3','4']} gap='20px' w='95%' m='auto' mt='30px'>
         {filteredCourses.map(course => (
          <Box key={course._id} p='30px'  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
          <Link  to={`/Course/${course._id}`}>
            <Heading fontFamily='mono' fontSize={'20px'} mb='10px'>{course.name}</Heading>
            <Text fontFamily='mono' fontWeight={'500'}>{course.description}</Text>
            <Text fontFamily='mono' fontWeight={'500'}>Total Lectures: {course.lectures.length}</Text>
          </Link>
          <Link to={`/Course/${course._id}`}>
            <Flex  gap='20px' flexWrap='wrap' justifyContent='center' mt='20px'>
              <Button fontFamily='mono' bg='red' color='white' >See Lectures</Button>
            </Flex>
          </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default UserDashboard
