import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';

interface Props {
  // replace any with PhotoFile interface that extends File interface
  setFiles: (files: any) => void;
}

export default function PhotoWidgetDropZone({ setFiles }: Props) {
  const dzStyles = {
    border: 'dashed 3px #eee',
    borderColour: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center',
    height: 200,
  };

  const dzActive = {
    borderColour: 'green',
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
    >
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop image here' />
    </div>
  );
}
