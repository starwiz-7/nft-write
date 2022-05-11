import React, { useState, useEffect } from 'react';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
  Textarea,
  Avatar,
  Icon,
  Button,
  VisuallyHidden,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
// import api from '../lib/appwrite';

export default function Component() {
  const { address } = useWeb3();
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [desc, setDesc] = useState('');

  const trialFunc = async () => {
    const current = await api.getFile(process.env.NEXT_PUBLIC_BUCKET_ID, '23434');
    console.log(current);
  };
  const submitHandler = async () => {
    const data = {
      username,
      firstName: firstname,
      lastName,
      description: desc,
    };

    const newAddr = address.slice(0, 32);
    const fileList = document.getElementById('file-upload').files;

    let uploadFileUrl;
    if (fileList.length > 0) {
      try {
        const current = await api.getFile(process.env.NEXT_PUBLIC_BUCKET_ID, '23434');
        if (current.username === '') {
          console.log(current);
          uploadFileUrl = await api.createFile(
            process.env.NEXT_PUBLIC_BUCKET_ID,
            newAddr,
            document.getElementById('file-upload').files[0]
          );
        } else {
          uploadFileUrl = await api.updateFile(
            process.env.NEXT_PUBLIC_BUCKET_ID,
            newAddr,
            document.getElementById('file-upload').files[0]
          );
        }
        console.log(uploadFileUrl);
      } catch (err) {
        console.log(err);
      }
    }

    if (uploadFileUrl) {
      data.profilePic = new URL(
        `http://localhost/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${newAddr}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`
      );
    }
    let dbData;
    try {
      dbData = await api.getDocument(process.env.NEXT_PUBLIC_COLLECTION_ID, newAddr);
    } catch (err) {
      console.log(err);
    }

    if (dbData) {
      api
        .updateDocument(
          process.env.NEXT_PUBLIC_COLLECTION_ID,
          newAddr,
          data,
          ['role:all'],
          ['role:all']
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .createDocument(
          process.env.NEXT_PUBLIC_COLLECTION_ID,
          newAddr,
          data,
          ['role:all'],
          ['role:all']
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // useEffect(() => {
  //   api
  //     .createSession()
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  return (
    <div style={{backgroundColor:'#f6dbff'}}>
    <Navbar/>
    <div className="w-1/2 m-auto h-screen px-20 pt-10">
      <chakra.form method="POST" rounded={[null, 'md']} overflow={{ sm: 'hidden' }} >
        <Stack px={4} py={5} bg={useColorModeValue('white', 'gray.700')} spacing={6} p={{ sm: 6 }}>
          <SimpleGrid columns={3} spacing={6}>
            <FormControl as={GridItem} colSpan={[3, 2]}>
              <FormLabel
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue('gray.700', 'gray.50')}
              >
                Username
              </FormLabel>
              <InputGroup size="md">
                <Input
                  type="tel"
                  placeholder="www.example.com"
                  focusBorderColor="brand.400"
                  rounded="md"
                  // width={'100%'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl as={GridItem} colSpan={[3, 2]}>
              <FormLabel
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue('gray.700', 'gray.50')}
              >
                First Name
              </FormLabel>
              <InputGroup size="md">
                <Input
                  type="tel"
                  placeholder="www.example.com"
                  focusBorderColor="brand.400"
                  rounded="md"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl as={GridItem} colSpan={[3, 2]}>
              <FormLabel
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue('gray.700', 'gray.50')}
              >
                Last name
              </FormLabel>
              <InputGroup size="md">
                <Input
                  type="tel"
                  placeholder="www.example.com"
                  focusBorderColor="brand.400"
                  rounded="md"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </SimpleGrid>

          <div>
            <FormControl id="email" mt={1}>
              <FormLabel
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue('gray.700', 'gray.50')}
              >
                About
              </FormLabel>
              <Textarea
                placeholder="you@example.com"
                mt={1}
                rows={3}
                shadow="sm"
                focusBorderColor="brand.400"
                fontSize={{ sm: 'sm' }}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <FormHelperText>
                Brief description for your profile. URLs are hyperlinked.
              </FormHelperText>
            </FormControl>
          </div>

          <FormControl>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color={useColorModeValue('gray.700', 'gray.50')}
            >
              Photo
            </FormLabel>
            <Flex alignItems="center" mt={1}>
              <Avatar
                boxSize={12}
                bg={useColorModeValue('gray.100', 'gray.800')}
                icon={
                  <Icon
                    as={FaUser}
                    boxSize={9}
                    mt={3}
                    rounded="full"
                    color={useColorModeValue('gray.300', 'gray.700')}
                  />
                }
              />
              <Button
                type="button"
                htmlFor="file-upload"
                ml={5}
                variant="outline"
                size="sm"
                fontWeight="medium"
                _focus={{ shadow: 'none' }}
              >
                <VisuallyHidden>
                  <input id="file-upload" name="file-upload" type="file" />
                </VisuallyHidden>
                <chakra.label
                  htmlFor="file-upload"
                  cursor="pointer"
                  rounded="md"
                  fontSize="md"
                  color={useColorModeValue('brand.600', 'brand.200')}
                  pos="relative"
                  _hover={{
                    color: useColorModeValue('brand.400', 'brand.300'),
                  }}
                >
                  <span>Change</span>
                  <VisuallyHidden>
                    <input id="file-upload" name="file-upload" type="file" />
                  </VisuallyHidden>
                </chakra.label>
              </Button>
            </Flex>
          </FormControl>
        </Stack>
        <Box
          px={{ base: 4, sm: 6 }}
          py={3}
          bg={useColorModeValue('gray.50', 'gray.900')}
          textAlign="right"
        >
          <Button
            type="submit"
            colorScheme="teal"
            _focus={{ shadow: '' }}
            fontWeight="md"
            onClick={submitHandler}
          >
            Save
          </Button>
        </Box>
      </chakra.form>
    </div>
    <Footer/>
    </div>
  );
}
