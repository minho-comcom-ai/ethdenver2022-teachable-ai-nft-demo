import StatusCode from 'network/StatusCode';

const FileUtil = {
  fetchFile: (url) => {
    return fetch(url, {
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => {
        switch (response.status) {
          case StatusCode.OK:
          case StatusCode.CREATED:
          case StatusCode.ACCEPTED:
          case StatusCode.NON_AUTHORITATIVE_INFORMATION:
          case StatusCode.NO_CONTENT:
          case StatusCode.RESET_CONTENT:
          case StatusCode.PARTIAL_CONTENT:
            return response.text();
          default:
            return null;
        }
      })
      .then((text) => {
        return text;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  },
  downloadStringAsFile: (fileName, stringContent) => {
    const elem = document.createElement('a');
    const file = new Blob([stringContent], {
      type: 'text/json',
    });
    elem.href = URL.createObjectURL(file);
    elem.download = fileName;
    document.body.appendChild(elem); // Required for this to work in FireFox
    elem.click();
  },
  bytesToSize: (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + sizes[i];
  },
};

export default FileUtil;
