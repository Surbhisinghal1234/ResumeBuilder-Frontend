// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function UserProfile({ blobUrl }) {
//   const [imageUrl, setImageUrl] = useState(null);

//   useEffect(() => {
//     async function fetchBlobImage() {
//       try {
//         const response = await axios.get(blobUrl, { responseType: 'blob' });
//         const blob = response.data;
//         const objectUrl = URL.createObjectURL(blob);
//         setImageUrl(objectUrl);
//       } catch (error) {
//         console.error('Error fetching image:', error);
//       }
//     }

//     fetchBlobImage();

   
//     return () => {
//       if (imageUrl) {
//         URL.revokeObjectURL(imageUrl);
//       }
//     };
//   }, [blobUrl]);

//   if (!imageUrl) {
//     return <div>Loading...</div>;
//   }

//   return <img src={imageUrl} alt="Blob Image" />;
// }

// export default UserProfile;
