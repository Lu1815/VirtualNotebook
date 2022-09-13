import React, { useState } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { 
    InputGroup, 
    InputLeftElement, 
    Input, 
    Heading,
    Center,
    Button,
    useDisclosure,
    Flex,
    Spacer,
    Box,
    Link, FormControl, FormLabel, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Modal
} from '@chakra-ui/react'
import { SearchIcon, ChevronRightIcon, SmallCloseIcon } from '@chakra-ui/icons'

import { useGetTopicsQuery, useCreateTopicMutation, useDeleteTopicMutation } from '../services/topicsApi'
import Loader from './Loader'

const TopicsList = () => {
    const [inputData, setInputData] = useState({ name: ''})
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data, isLoading, refetch } = useGetTopicsQuery();
    const [createTopic] = useCreateTopicMutation();
    const [deleteTopic] = useDeleteTopicMutation();

    const handleChange = async (e) => {
        const value = e.target.value
        setInputData({
            ...inputData,
            [e.target.name]: value
        })
    }

    const createNewTopic = async (e) => {
        await createTopic({name: inputData.name})
        setInputData({ name: '' });
        refetch();
    }

    const deleteHandler = async (i) => {
        await deleteTopic({topicId: i});
        refetch();
      }

    if(isLoading) return <Loader />;

    return (
        <div>
            <Center p={2}>
                <Heading>Topics List</Heading>
            </Center>
            <InputGroup>
                <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.600' />} />
                <Input type='text' variant="filled" placeholder='Topic name' focusBorderColor='gray.800'/>
            </InputGroup>

            <div className='flex justify-center flex-col md:flex-row md:flex-wrap md:w-full'>
                {data?.length === 0 ? (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <h1>Add a topic!</h1>
                    </div>
                ) : data?.map(topic => 
                    (
                        <Box
                            w={{ base: '100%', md: '300px' }}
                            bg={'white'}
                            mt={2}
                            boxShadow={'2xl'}
                            rounded={'md'}
                            overflow={'hidden'}
                            key={topic.topicId}
                        >
                    
                            <Flex direction={'row'}>
                                <div>
                                    <Button
                                        h='100%'
                                        bg={'white'}
                                        rounded={'right'}
                                        _hover={{
                                            boxShadow: 'lg',
                                            backgroundColor: "gray.700"
                                        }}
                                        onClick={() => deleteHandler(topic.topicId)}
                                    >
                                        <SmallCloseIcon color="red.500" />
                                    </Button>
                                </div>
                                <Spacer />
                                <Center p={6}>
                                    <Heading fontSize={{sm: 'md', md:'md', lg:'lg', xl:'xl'}} fontWeight={500} fontFamily={'body'}>
                                        { topic.name }
                                    </Heading>
                                </Center>
                                <Spacer />
                                <div>
                                    <Link as={ReactLink} to={`/Notes/${topic.topicId}`}>
                                        <Button
                                            h='100%'
                                            bg={'gray.800'}
                                            color={'white'}
                                            rounded={'right'}
                                            _hover={{
                                                boxShadow: 'lg',
                                                backgroundColor: "gray.700"
                                            }}>
                                            <ChevronRightIcon color="gray.100" />
                                        </Button>
                                    </Link>
                                </div>
                            </Flex>
                        </Box>
                    )
                )}
            </div>

            <Button onClick={onOpen} w={'full'} mt={2} bg={'gray.800'} color={'white'} _hover={{backgroundColor: "gray.700"}}>
                Add topic
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a topic</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Topic</FormLabel>
                            <Input placeholder='Topic name...' variant='filled' focusBorderColor='gray.800' name="name" 
                            onChange={handleChange}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}
                            onClick={
                                () => { 
                                    createNewTopic()
                                    onClose() 
                                }
                            }
                        >
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default TopicsList