import { mimeTypes } from "./mimeTypes";

const filePreview = (extension = null, data) => {
  let strMimeType;
  let fileURL;

  strMimeType = mimeTypes?.[extension];
  const file = new Blob([data], {
    type: strMimeType,
  });

  fileURL = URL.createObjectURL(file);
  return window.open(fileURL);
};

export default filePreview;
