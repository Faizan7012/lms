import { Box, Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AuthContext } from '../context/user'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const {user , isAuth , logout} = useContext(AuthContext)
  return (
    <Flex bg='#000040' color='white' fontFamily='mono' justifyContent='space-between' p='20px' alignItems='center' textAlign='center' fontWeight={'600'}> 
      <Box>
        Edo <span style={{color:'yellow'}}>Hub</span>
      </Box>
      <Box>
        <Box>{user?.name} -  [{user?.role}]</Box>
        <Box>{user?.email}</Box>
      </Box>
      {
        user?.role === 'admin'?
        <Flex justifyContent='space-between' p='20px' alignItems='center' textAlign='center' gap='20px'>
            <Link to='/'>AdminDashborad</Link>
            <Link to='/allstudents'>AllStudents</Link>
            <Link to='/profile'>Profile</Link>
            {
                isAuth ?<Link onClick={()=>logout()}>Logout</Link>:
                <Link to='/login'>Login</Link>
            }
        </Flex>
        :
        <Flex justifyContent='space-between' p='20px' alignItems='center' textAlign='center' gap='20px'>
            <Link to='/'>StudentDashborad</Link>
            <Link to='/allcourses'>AllCourses</Link>
            <Link to='/profile'>Profile</Link>
            {
                isAuth ?<Link onClick={()=>logout()}>Logout</Link>:
                <Link to='/login'>Login</Link>
            }
        </Flex>
      }
    </Flex>
  )
}

export default Navbar
