import { Platform } from 'react-native';

export const createFormData = (images, body) => {
  const data = new FormData();
  if (!images.length) {
    images = [images];
  }
  images.forEach(image => {
    let extenstion = image.uri.split(".");
    extenstion = extenstion[extenstion.length - 1];
    let fileName = new Date().toISOString();
    while (fileName.includes(":")) {
      fileName = fileName.replace(":", "-")
    }
    data.append("image", {
      name: fileName + "." + extenstion,
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
