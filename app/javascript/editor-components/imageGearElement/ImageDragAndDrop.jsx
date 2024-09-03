import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { FaCheck } from "react-icons/fa";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const dropzoneStyle = {
  border: "2px dashed #e7e7e7",
  borderRadius: "5px",
  backgroundColor: "#fafafa",
  height: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "20px",
  cursor: "pointer",
};

const textStyle = {
  color: "#bdbdbd",
  fontWeight: "bold",
  fontSize: "14px",
  cursor: "pointer",
};

function DropArea({ onSetImage }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["imageLists"],
    queryFn: () => fetch("/image_lists").then((res) => res.json()),
  });
  const { data: awsCreds } = useQuery({
    queryKey: ["awsCreds"],
    queryFn: () =>
      fetch("/image_lists/get_aws_creds").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const uploadToS3 = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const bucketName = "ucart-assets";
    const region = "us-east-1";
    const { accessKeyId, secretAccessKey } = awsCreds;
    const s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    try {
      const parallelUploads3 = new Upload({
        client: s3,
        params: {
          Bucket: bucketName,
          Key: fileName,
          Body: file,
          ContentType: file.type, // Correctly setting the content type
        },
      });

      await parallelUploads3.done();

      return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
    } catch (error) {
      console.error("Error uploading file: ", error);
      return null;
    }
  };

  const onDrop = async (acceptedFiles) => {
    const divs = document.querySelectorAll("div");

    // Filter to find the <div> with height of 5px
    const targetDiv = Array.from(divs).find((div) => {
      return getComputedStyle(div).height === "5px";
    });

    if (targetDiv) {
      targetDiv.remove();
    }

    // show error if file size is more than 5MB
    if (acceptedFiles[0].size > 5242880) {
      alert("File size should be less than 5MB");
      return;
    }
    setIsUploading(true);
    if (acceptedFiles.length === 0) {
      setIsUploading(false);
      return alert("Please select one file at a time");
    }

    const file = acceptedFiles[0];

    try {
      const imageUrl = await uploadToS3(file);
      if (imageUrl) {
        const newImage = {
          id: Math.random().toString(36).substring(7),
          url: imageUrl,
        };
        await updateSteps(imageUrl, newImage.id);
        selectImage(newImage);
        setUploadedImages([...uploadedImages, newImage]);
        console.log([...uploadedImages, newImage]);
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const updateSteps = async (url, imgid) => {
    const body = JSON.stringify({ image: { url, imgid } });
    return fetch("/image_lists/add_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  };

  const isSelected = (file) => {
    return selectedFile && file.id === selectedFile.id;
  };

  const selectImage = (image) => {
    setSelectedFile(image);
    if (onSetImage) {
      onSetImage(image.url);
    }
  };

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        accept={{
          "image/*": [
            ".jpeg",
            ".jpg",
            ".png",
            ".gif",
            ".bmp",
            ".tiff",
            ".webp",
          ],
        }}
        maxFiles={1}
        multiple={false}
        disabled={isUploading}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} style={dropzoneStyle}>
              <input {...getInputProps()} />
              {isUploading ? (
                <p style={textStyle}>Uploading...</p>
              ) : (
                <p style={textStyle}>
                  Drag & Drop your image here, or click to select files
                </p>
              )}
            </div>
          </section>
        )}
      </Dropzone>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          padding: "20px 0",
        }}
      >
        {[...data, ...uploadedImages].map((image, index) => (
          <div
            onClick={() => selectImage(image)}
            key={index}
            style={{
              cursor: "pointer",
              position: "relative",
              transition: "all 0.3s ease-in-out",
              borderRadius: "10px",
              overflow: "hidden",
              border: `5px solid ${isSelected(image) ? "#3DC831" : "white"}`,
            }}
          >
            {isSelected(image) && (
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  padding: "5px",
                  backgroundColor: "#3EC831",
                  color: "white",
                  fontSize: "1em",
                  fontWeight: "bold",
                  borderRadius: "0 0 0 10px",
                }}
              >
                <FaCheck />
              </div>
            )}
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={image.url}
              alt={image.url}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export function ImageDragAndDrop({ onSetImage }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DropArea onSetImage={onSetImage} />
    </QueryClientProvider>
  );
}
