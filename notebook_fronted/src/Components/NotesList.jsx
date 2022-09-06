import React, { useState } from 'react'
import { Link as ReactLink, useParams } from 'react-router-dom'
import { SearchIcon, EditIcon, SmallCloseIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { useGetNotesQuery, useCreateNoteMutation, useEditNoteMutation, useDeleteNoteMutation } from '../services/notesApi'
import { 
    InputGroup, 
    InputLeftElement, 
    Input, 
    Flex,
    Spacer,
    Heading,
    Box,
    Center,
    Button,
    useDisclosure,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    FormControl,
    Text,
    ModalCloseButton,
    ModalBody,
    Textarea,
    ModalFooter
} from '@chakra-ui/react'
import Loader from './Loader'
import axios from 'axios'

const initialState = { title: "", body: "", topicId: "" }
const initialEditState = { noteId: "", title: "", body: "", topicId: "" }
const url = `https://localhost:7158/Note/one?id=`;

const NotesList = () => {
  let date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let localDate = date.toLocaleDateString('en-EN', options);

  const [ inputData, setInputData ] = useState(initialState);
  const [ noteData, setNoteData ] = useState(initialEditState.noteId);

  const { topicId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, isLoading, refetch } = useGetNotesQuery(topicId)
  // const { noteData } = useGetOneNoteQuery(noteId)

  const [ createNote ] = useCreateNoteMutation();
  const [ editNote ] = useEditNoteMutation();
  const [ deleteNote ] = useDeleteNoteMutation();

  if(isLoading) return <Loader />;

  console.log(noteData)
  console.log(inputData)

  const getNoteToUpdate = (id) => {
    axios.get(url + id)
    .then(res => {
      setNoteData(res.data[0])
    })
  }

  const handleChange = async (e) => {
    const value = e.target.value
    setInputData({
      ...inputData,
      [e.target.name]: value
    })
  }

  const editHandleChange = async (e) => {
    const value = e.target.value
    setNoteData({
      ...noteData,
      [e.target.name]: value
    })
  }

  const createNewNote = async (e) => {
      inputData.topicId = topicId;
      await createNote(inputData)
      setInputData({ name: '' });
      refetch();
  }

  const editHandler = async (note) => {
    await editNote(note);
    refetch();
  }

  const deleteHandler = async (i) => {
    await deleteNote({ noteId: i });
    refetch();
  }

  return (
    <div>
      <Center p={2}>
          <Heading>{data.length === 0 ? 'Topic' : data[0].topic}</Heading>
      </Center>

      <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.600' />}
          />
          <Input type='tel' variant="filled" placeholder='Note title, date...' focusBorderColor='gray.800'/>
      </InputGroup>

      <div className='flex justify-center flex-col md:flex-row md:flex-wrap md:w-full'>
        {data.length === 0 ? (
            <div style={{display: "flex", justifyContent: "center"}}>
              <h1>Notes will appear here</h1>
            </div>
          ) : 
          (
            data.map(note => (
              <Box
                w={{ base: '100%', md: '300px' }}
                bg={'white'}
                mt={2}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                key={note.noteId}
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
                              onClick={() => deleteHandler(note.noteId)}
                          >
                              <SmallCloseIcon color="red.500" />
                          </Button>
                      </div>
                      <Spacer />
                      <Center p={6}>
                          <Heading fontSize={{sm: 'md', md:'md', lg:'lg', xl:'xl'}} fontWeight={500} fontFamily={'body'}>
                              { note.title }
                          </Heading>
                      </Center>
                      <Spacer />
                      <div>
                        <Button
                          onClick={
                            () => {
                              getNoteToUpdate(note.noteId)
                              onOpen()
                            }
                          }
                          h='100%'
                          bg={'gray.800'}
                          color={'white'}
                          rounded={'right'}
                          _hover={{
                            boxShadow: 'lg',
                            backgroundColor: "gray.700"
                          }}>
                            <EditIcon color="gray.100" />
                        </Button>
                      </div>
                  </Flex>
              </Box>
              )
            )
          )
        }
      </div>

      <Button id='btnAddNote' onClick={onOpen} w={'full'} mt={2} bg={'gray.800'} color={'white'} _hover={{backgroundColor: "gray.700"}}>
        Add note
      </Button>
      
      <Link as={ReactLink} to="/">
        <Button variant='outline' w={'full'} mt={2} border='1px' borderColor='gray.800' _hover={{backgroundColor: "gray.800" }}>
          <ArrowBackIcon color="gray.800"/>
        </Button>
      </Link>

      <Modal onClose={onClose} size={'full'} isOpen={isOpen} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent bg='gray.800' color="white">
            <ModalHeader>
                <FormControl>
                    <Input placeholder='Note title...' variant='flushed' focusBorderColor='gray.800' name="title" 
                    onChange={noteData ? editHandleChange : handleChange} value={ noteData ? `${noteData.title}` : null }/>
                    <Text fontSize='xs' color="gray.500">
                    {
                      noteData ? 
                        `${noteData.startDateTime.slice(0,10)} - ${noteData.startDateTime.slice(12,19)}` 
                      : localDate 
                    }
                    </Text>
                </FormControl>
            </ModalHeader>
            <ModalCloseButton onClick={() => setNoteData('')}/>
            <ModalBody>
                <FormControl>
                    <Textarea name="body" size='lg' border='none' rows='14' mt={2} placeholder='Here is a sample placeholder' 
                    onChange={noteData ? editHandleChange : handleChange} value={ noteData ? `${noteData.body}` : null }/>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => {
                    noteData ? editHandler(noteData) : createNewNote()
                    onClose()}
                  } 
                  bg="gray.400" color="black" mr={3}
                >
                  {noteData ? 'Edit' : 'Save'}
                </Button>
                <Button onClick={() => {
                    onClose(setNoteData(''))
                  }
                } 
                variant='outline' color="white">Close</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
  </div>
  )
}

export default NotesList