import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/user';
import { Box, Flex, Heading, VStack } from '@chakra-ui/react';

const AllStudent = () => {
    const [data , setData] = useState([]);
    const {token} = useContext(AuthContext)

    useEffect(()=>{
          async function getData(){
            let res = await axios.get('https://magnificent-bat-sandals.cyclic.app/user/allusers' , {headers :{token}});
            let ans = await res.data;
            setData(ans.allUsers)
          }
          getData()
    },[])
 const handleDel = async(id)=>{
    try {
        let res = await axios.delete(`https://magnificent-bat-sandals.cyclic.app/user/${id}` , {headers :{token}});
        let ans = await res.data;
        if(ans.status){
            alert('deleted')
            setData(data.filter((ele)=>ele._id !== id))
        }
        else{
            alert(ans.message)
        }
    } catch (error) {
        alert(error.message)
    }
 }
  return (
    <Box >
    <Heading fontSize={'25px'} fontFamily={'monospace'}>All Students Profile</Heading>

    <VStack borderRadius={'5px'} fontSize={'20px'} fontFamily={'monospace'} fontWeight={'600'} w={['300px','450px' , '700px','800px']}  p='30px' m='auto' mt='50px' boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
           {
            data?.map((ele)=>{
                return <Flex gap='20px' alignItems={'center'} justifyContent={'center'}>
                      <Box>Name - {ele.name}</Box>
                      <Box>Email - {ele.email}</Box>
                      <Box onClick={()=>handleDel(ele._id)} textAlign={'right'} ml='30px' color='red' cursor={'pointer'}>Delete</Box>
                </Flex>
            })
           }
    </VStack>
</Box>
  )
}

export default AllStudent
