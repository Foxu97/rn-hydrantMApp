import {Platform} from 'react-native';

export const createFormData = (photo) => {
    let extenstion = photo.uri.split(".");
    extenstion = extenstion[extenstion.length-1];
    let fileName = new Date().toISOString();
    while(fileName.includes(":")){
        fileName = fileName.replace(":", "-")
    }
    const data = new FormData();
  
    data.append("image", {
      name: fileName + "." + extenstion,
      type: photo.type + "/" + extenstion,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
    return data;
  };