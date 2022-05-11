import { Avatar, Divider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { useWeb3 } from '@3rdweb/hooks';
import api from '../../lib/appwrite';

export default function ProfileCard(props) {
  const [src, setSrc] = useState();
  const { address } = useWeb3();
  const getProfilePicture = async (addr) => {
    try {
      const address = '0x8C1Bb3819E244F0868440dFc6517AFf16627613B';
      const fileId = address.slice(0, 32);
      const metadata = await api.getFile(process.env.NEXT_PUBLIC_BUCKET_ID, fileId);
      console.log(metadata);
      setSrc(metadata);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(props.address, address);
    getProfilePicture(props.address);
    setSrc(`https://gradient-avatar.glitch.me/${props.address}`);
  }, []);
  return (
    <div className="w-full flex items-center justify-center bg-gray text-white rounded-lg flex-col py-8 px-6">
      <Avatar size="2xl" className="mb-8" src={src} />
      <p>Address</p>
      <div className="p-2 flex items-center space-x-2">
        <p className="text-lg text-light-purple">
          {' '}
          {props.address !== undefined
            ? props.address.substring(0, 6) +
              '...' +
              props.address.substring(props.address.length - 4)
            : 'No address'}
        </p>
        <BiCopy
          className="cursor-pointer  hover:text-dark-purple"
          onClick={() => {
            navigator.clipboard.writeText(props.address);
          }}
        />
      </div>
      {/* <Divider /> */}
    </div>
  );
}
