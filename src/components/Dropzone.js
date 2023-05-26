import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, Button } from 'react-bootstrap';

const Dropzone = ({ setFile }) => {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles[0].size <= 25000000) { // Verifique se o arquivo tem menos de 25MB
      setFile(acceptedFiles[0]);
    } else {
      alert("Arquivo maior que 25MB");
      setFile(null);
    }
  }, [setFile]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Card {...getRootProps()} className="text-center p-3">
    <input {...getInputProps()} />
    <Button variant="outline-primary">Upload (mp3, mp4, mpeg, mpga, m4a, wav, and webm)</Button>
  </Card>
  );
};

export default Dropzone;
