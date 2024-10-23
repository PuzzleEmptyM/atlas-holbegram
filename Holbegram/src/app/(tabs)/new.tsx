import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { storage, db, auth } from '../../../firebase'; 
import { pickImage } from '../../utils/imagePicker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddPostScreen: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  const handlePickImage = async () => {
    const imageUri = await pickImage();
    if (imageUri) {
      setImage(imageUri);
    }
  };

  const handleUpload = async () => {
    if (image && caption) {
      try {
        setUploading(true);
  
        const userId = auth.currentUser?.uid;
  
        if (!userId) {
          alert('You must be logged in to post.');
          setUploading(false);
          return;
        }
  
        // Create a reference in Firebase Storage
        const filename = `${userId}_${new Date().getTime()}.jpg`;
        const storageRef = ref(storage, `images/${filename}`);
  
        // Fetch the image URI and convert it to a blob
        const response = await fetch(image);
        const blob = await response.blob();
  
        // Upload the file using PUT semantics
        await uploadBytes(storageRef, blob);
  
        // Get the download URL after successful upload
        const imageURL = await getDownloadURL(storageRef);
  
        // Add post details to Firestore
        await addDoc(collection(db, 'posts'), {
          userId,
          caption,
          imageURL,
          createdAt: serverTimestamp(),
        });
  
        setUploading(false);
        setImage(null);
        setCaption('');
        alert('Post uploaded successfully!');
      } catch (error) {
        console.error('Error uploading post:', error);
        setUploading(false);
      }
    } else {
      alert('Please select an image and add a caption');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TouchableOpacity onPress={handlePickImage} style={{ marginBottom: 20 }}>
        <Text style={{ color: '#1ed2af', textAlign: 'center', marginBottom: 10 }}>
          Select an Image
        </Text>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf: 'center' }} />}
      </TouchableOpacity>

      <TextInput
        placeholder="Add a caption"
        value={caption}
        onChangeText={(text) => setCaption(text)}
        style={{
          borderWidth: 1,
          borderColor: '#1ed2af',
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
        placeholderTextColor="#ffffff"
      />
      
      <TouchableOpacity onPress={handleUpload} style={{ backgroundColor: '#1ed2af', padding: 15, borderRadius: 5 }}>
        <Text style={{ textAlign: 'center', color: '#ffffff' }}>{uploading ? 'Uploading...' : 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPostScreen;
