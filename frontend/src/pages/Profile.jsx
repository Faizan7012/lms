import { Box, Heading, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AuthContext } from '../context/user'

const Profile = () => {
    const {user} = useContext(AuthContext)

  return (
       <Box >
              <Heading fontSize={'25px'} fontFamily={'monospace'}>Profile</Heading>

              <VStack borderRadius={'5px'} fontSize={'20px'} fontFamily={'monospace'} fontWeight={'600'} w='300px' h='300px' p='30px' m='auto' mt='50px' boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
                <Box>Name  : {user?.name}</Box>
                <Box>Email  : {user?.email}</Box>
                <Box>Role : {user?.role}</Box>
              </VStack>
       </Box>
  )
}

export default Profile
