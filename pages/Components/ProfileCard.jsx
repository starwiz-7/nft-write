import { Avatar, Divider, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { useMetamask, useAddress, useNetwork } from '@thirdweb-dev/react';
import api from '../../lib/appwrite';

export default function ProfileCard(props) {
  const [src, setSrc] = useState();
  const [dummy, setDummy] = useState({});
  const [loading, setLoading] = useState(true);
  const address = useAddress();
  // let dummy;
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

  const getProfileData = async () => {
    try {
      const documentId = address.slice(0, 32);
      const profileData = await api.getDocument(process.env.NEXT_PUBLIC_COLLECTION_ID, documentId);
      // console.log(profileData);
      setDummy(profileData);
      setLoading(false);
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    (async () => {
      await getProfileData();
    })();
    // getProfileData();
    getProfilePicture(props.address);
    setSrc(`https://gradient-avatar.glitch.me/${props.address}`);
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div
      className="w-full flex items-center justify-center text-black rounded-lg flex-col py-8 px-6 drop-shadow-xl"
      style={{ backgroundColor: '#f6dbff' }}
    >
      <Avatar size="2xl" className="mb-8" src={dummy?.profilePic} />
      <p className="">
        <span className="text-xl font-extrabold">{dummy?.username}</span>
      </p>
      <p>{' (' + dummy?.firstName + ' ' + dummy?.lastName + ')'}</p>
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
      <p className="text-center">{dummy?.description}</p>
      {/* <Divider /> */}
    </div>
  );
}
