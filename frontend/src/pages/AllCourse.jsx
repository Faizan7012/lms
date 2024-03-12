import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/user';
import { Box, Button, Flex, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const baseUrl = 'https://magnificent-bat-sandals.cyclic.app'

const AllCourse = () => {
    const [courses, setCourses] = useState([]);
    const {token , user} = useContext(AuthContext)
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


      const handleJoin = async(courseId)=>{
        try {
            const response = await fetch(`${baseUrl}/user/add-courses`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "token": `${token}`
              },
              body: JSON.stringify({userId : user._id , courseId : courseId})
            });
            const data = await response.json();
            if (response.ok) {
              alert(data.message);
            } else {
              alert(data.message);
            }
          } catch (error) {
            console.error('Error:', error);
            alert(error);
          }
      }

      const filteredCourses = courses.filter(course => {
        return course.name.toLowerCase().includes(searchQuery.toLowerCase()) || course.description.toLowerCase().includes(searchQuery.toLowerCase());
      });
  return (
    <Box>
        <Heading textAlign={'left'} fontSize={'25px'} fontStyle={'mono'}> All Courses</Heading>
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
            <Flex  gap='20px' flexWrap='wrap' justifyContent='center' mt='20px'>
              <Button fontFamily='mono' bg='blue' color='white' onClick={()=>handleJoin(course._id)}>Join Course</Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default AllCourse
