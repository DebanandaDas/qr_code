function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var imageContainer = {
  position: 'relative',
  display: 'inline-block'
};
var imageCanvas = {
  display: 'none'
};
var captureBtn = {
  border: '1px solid white',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  background: '#f7473587',
  position: 'absolute',
  top: '85%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  cursor: 'pointer'
};

function ImageCapture(props) {
  var onCapture = props.onCapture,
      onError = props.onError,
      width = props.width,
      userMediaConfig = props.userMediaConfig;

  var _useState = React.useState(false),
      streaming = _useState[0],
      setStreaming = _useState[1];

  var playerRef = React.createRef();
  var canvasRef = React.createRef();
  var tracks = React.useRef();
  React.useEffect(function () {
    var timeout;
    navigator.mediaDevices.getUserMedia(userMediaConfig).then(function (stream) {
      playerRef.current.srcObject = stream;
      tracks.current = stream.getTracks();
      timeout = setTimeout(function () {
        return setStreaming(true);
      }, 2000);
    })["catch"](function (error) {
      if (onError) onError(error);
    });
    return function () {
      if (timeout) clearTimeout(timeout);
    };
  }, [onError, userMediaConfig]);
  React.useEffect(function () {
    return function () {
      if (tracks.current) {
        tracks.current[0].stop();
      }
    };
  }, []);
  var captureImage = React.useCallback(function () {
    var imageWidth = playerRef.current.offsetWidth;
    var imageHeight = playerRef.current.offsetHeight;
    var _ref = [imageWidth, imageHeight];
    canvasRef.current.width = _ref[0];
    canvasRef.current.height = _ref[1];
    var context = canvasRef.current.getContext('2d');
    context.drawImage(playerRef.current, 0, 0, imageWidth, imageHeight);

    if (onCapture) {
      var webPData = canvasRef.current.toDataURL();
      canvasRef.current.toBlob(function (blob) {
        onCapture({
          blob: blob,
          webP: webPData,
          file: new File([webPData], new Date().getTime() + ".png")
        });
      });
    }
  }, [onCapture, canvasRef, playerRef]);
  return /*#__PURE__*/React__default.createElement("div", {
    style: imageContainer
  }, /*#__PURE__*/React__default.createElement("video", {
    ref: playerRef,
    autoPlay: true,
    width: width
  }), streaming && /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    style: captureBtn,
    onClick: captureImage
  }), /*#__PURE__*/React__default.createElement("canvas", {
    style: imageCanvas,
    ref: canvasRef
  })));
}

module.exports = ImageCapture;
//# sourceMappingURL=index.js.map
