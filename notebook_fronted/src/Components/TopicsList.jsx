import React, { useState, useEffect, useRef } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { 
    InputGroup, 
    InputLeftElement, 
    InputRightElement,
    Input, 
    Heading,
    Center,
    Button,
    useDisclosure,
    Flex,
    Spacer,
    Box,
    Link, FormControl, FormLabel, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Modal,
    AlertDialog,
    AlertDialogContent,
    AlertDialogOverlay,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from '@chakra-ui/react'
import { SearchIcon, ChevronRightIcon, SmallCloseIcon, CloseIcon } from '@chakra-ui/icons'

import { useGetTopicsQuery, useCreateTopicMutation, useDeleteTopicMutation } from '../services/topicsApi'
import { useGetNotesQuery } from '../services/notesApi'
import Loader from './Loader'

const TopicsList = () => {
    const cancelRef = useRef()

    //Uses States
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [inputData, setInputData] = useState({ name: ''})
    const [id, setId] = useState('');
    
    //Uses disclosures (for modal or alerts)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()

    //RTK Hooks from TopicsAPI or NotesAPI
    const { data: existNoteInTopic } = useGetNotesQuery(id);
    const { data: topics, isLoading, refetch } = useGetTopicsQuery();
    const [createTopic] = useCreateTopicMutation();
    const [deleteTopic] = useDeleteTopicMutation();

    useEffect(() => {
        const filteredData = topics?.filter(note => 
            note.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setData(filteredData);
    }, [topics, searchTerm]);

    //FUNCTIONS TO DEVELOP THE COMPONENT FUNCTIONALITY
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
        setId(i);

        if( existNoteInTopic?.length > 0 ){
            onAlertOpen();
        } else {
            await deleteTopic({topicId: i});
            refetch();
        }
    }

    // ALL RETURNS MUST BE AT THE BOTTOM OF THE COMPONENT

    if(isLoading) return <Loader />;

    return (
        <div>
            <Center p={2}>
                <Heading>Topics List</Heading>
            </Center>
            <InputGroup>
                <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.600' />} />
                <Input type='text' variant="filled" placeholder='Topic name' focusBorderColor='gray.800'
                    onChange={e => setSearchTerm(e.target.value)} value={searchTerm}
                />
                <InputRightElement>
                    {
                        searchTerm && (
                            <button type='button' className='' onClick={() => setSearchTerm('')}>
                                <CloseIcon color="red.500"/>
                            </button>
                        )
                    }
                </InputRightElement>
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

            {/* MODAL CREATE A NEW TOPIC */}
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

            {/* ALERT DIALOG WHEN CLICK ON DELETE BUTTON */}
            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
                >
                <AlertDialogOverlay>
                <AlertDialogContent
                    w="90%"
                >
                    <Alert status='error' borderRadius="md">
                        <Flex>
                            <Center>
                                <AlertIcon />
                            </Center>
                            <Spacer />
                            <Box>
                                <AlertTitle>Error!</AlertTitle>
                                <AlertDescription>
                                    You can't delete a topic with notes inside.
                                </AlertDescription>
                            </Box>
                            <Spacer />
                            <Center ml="8">
                                <Button ref={cancelRef} onClick={() => {
                                            onAlertClose();
                                        }
                                    }>
                                    Ok
                                </Button>
                            </Center>
                        </Flex>
                    </Alert>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    )
}

export default TopicsList