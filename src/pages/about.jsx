import React, { useState } from 'react';
import storage from '../api/storage';

function About() {
  const [files, setFiles] = useState();
  const [img, setImg] = useState(
    'https://img-ovh-cloud.zszywka.pl/1/0378/0142-kon.jpg'
  );

  return (
    <>
      <img src={img} alt="konis" />
      <input
        type="file"
        accept="image/*"
        onChange={event => {
          setFiles(event.target.files);
        }}
      />
      <button
        onClick={() => {
          const uploadFile = async () => {
            const url = await storage.upload(files[0]);

            setImg(url);
          };
          uploadFile();
        }}
      >
        Wpychaj do storage
      </button>
    </>
  );
}

export default About;
