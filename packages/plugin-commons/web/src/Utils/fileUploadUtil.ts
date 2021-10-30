const fileReader = file => {
  return new Promise(resolve => {
    resolve(URL.createObjectURL(file));
  });
};

export const uploadFile = ({
  file,
  uploadFunction,
  onFileResolve,
  onSuccess,
  onError,
}: {
  file: File;
  uploadFunction: (file: File, callback: ({ data, error }) => void) => void;
  onFileResolve: (url: string) => void;
  onSuccess: (data) => void;
  onError?: (error: Error) => void;
}) => {
  fileReader(file).then((url: string) => {
    onFileResolve(url);
    uploadFunction(file, ({ data, error }) => {
      if (error) {
        onError?.(error);
      } else {
        onSuccess(data);
      }
    });
  });
};
