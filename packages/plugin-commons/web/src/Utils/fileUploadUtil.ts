const fileReader = file => {
  return new Promise(resolve => {
    resolve(URL.createObjectURL(file));
  });
};

export const uploadFile = ({
  file,
  uploadHandler,
  onFileResolve,
  onSuccess,
  onError,
}: {
  file: File;
  uploadHandler: (file: File, callback: ({ data, error }) => void) => void;
  onFileResolve: (url: string) => void;
  onSuccess: (data) => void;
  onError?: (error: Error) => void;
}) => {
  fileReader(file).then((url: string) => {
    onFileResolve(url);
    uploadHandler(file, ({ data, error }) => {
      if (error) {
        onError?.(error);
      } else {
        onSuccess(data);
      }
    });
  });
};
