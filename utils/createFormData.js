import { Platform } from 'react-native';

export const createFormData = (images, body) => {
  const data = new FormData();
  let filename;
  if (!images.length) {
    images = [images];
  }
  images.forEach((image, index) => {
    let fileName = image.filename;
    if (images.length === 1) {
      fileName = new Date().toISOString();
    } else {
      fileName = image.filename
    }
    let extenstion = image.uri.split(".");
    extenstion = extenstion[extenstion.length - 1];
    data.append("image", {
      name: fileName,
      type: "image/" + extenstion,
      uri:
        Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
    });
  });

  if (body) {
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  }
  return data;
};
