import { Paper, Typography, Divider, Input } from "@material-ui/core";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import imageCompression from "browser-image-compression";
import GestureIcon from "@material-ui/icons/Gesture";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ImageIcon from "@material-ui/icons/Image";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import SendIcon from "@material-ui/icons/Send";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Backdrop from "@material-ui/core/Backdrop";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
//--------------------local-imports------------------//
import Style from "./style";
import Animation from "../animations/animation";
import Loading from "../../images/wave-loading.json";

const PostForm = ({ props }) => {
  const classes = Style();
  const history = useHistory();
  const muiTheme = useTheme();

  const { isLoading, isWarning, setIsWarning, message, heading, submitButtonText, data, setData, onSubmitHandler } = props;

  const imageUploadHandler = async (e) => {
    let compressedImage;

    const inputImage = e.target.files[0];

    const compressionOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      compressedImage = await imageCompression(inputImage, compressionOptions);
    } catch (error) {
      console.log(error);
    }

    const file = new FileReader();
    if (compressedImage) {
      file.onloadend = (fileLoadedEvent) => {
        const base64Formate = fileLoadedEvent.target.result;
        setData({ ...data, selectedFile: base64Formate });
      };
      file.readAsDataURL(compressedImage);
    }
  };

  const anime = useSpring({
    width: "100%",
    height: "100%",
    paddingBottom: "8vh",
    position: "relative",
    top: "0%",
    opacity: 1,
    from: {
      top: "100%",
      opacity: 0,
    },
  });

  const goBackButtonClick = () => {
    history.goBack();
  };

  const Header = () => (
    <>
      <div className={classes.form__header}>
        <Typography variant="subtitle1" className={classes.header__title}>
          <KeyboardBackspaceIcon onClick={goBackButtonClick} />
          {heading}
        </Typography>
        <Typography className={classes.header__post__button} onClick={onSubmitHandler}>
          {submitButtonText}
          <SendIcon />
        </Typography>
      </div>
      <Divider />
    </>
  );

  const UploadImage = () => (
    <>
      <Divider />
      <Paper elevation={0} className={classes.bottom__tools}>
        <Typography variant="h6">Upload an image....</Typography>
        <label htmlFor="file">
          <PhotoCameraIcon style={{ color: muiTheme.palette.success.main }} />
          <ImageIcon style={{ color: muiTheme.palette.info.dark }} />
          <VideocamOffIcon style={{ color: muiTheme.palette.error.main }} />
        </label>
      </Paper>
    </>
  );

  const Error = () => (
    <Snackbar anchorOrigin={{ horizontal: "center", vertical: "top" }} autoHideDuration={2500} open={isWarning} onClose={() => setIsWarning(false)} style={{ position: "absolute", zIndex: 10001 }}>
      <Alert severity="error">Error: {message}</Alert>
    </Snackbar>
  );

  const LoadingAnimation = () => (
    <Backdrop open={isLoading} style={{ zIndex: 10000 }}>
      <div style={{ width: "500px", height: "250px" }}>
        <Animation src={Loading} />
      </div>
    </Backdrop>
  );

  return (
    <animated.div style={anime}>
      <Paper elevation={0} className={classes.root}>
        <Paper className={classes.form}>
          <form noValidate autoComplete="off" onSubmit={onSubmitHandler}>
            <Header />

            {/* Form Title filed */}
            <div className={classes.form__title}>
              <LabelImportantIcon style={{ color: muiTheme.palette.success.dark }} />
              <Input placeholder="Add an unique title" disableUnderline required id="title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
            </div>

            {/* Form Description filed */}
            <div className={classes.form__description}>
              <GestureIcon style={{ color: muiTheme.palette.secondary.dark }} />
              <Input placeholder="Describe more..." disableUnderline required id="description" fullWidth multiline value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
            </div>

            {/* Form Upload image filed */}
            <div className={classes.form__upload}>
              <input type="file" id="file" accept="image/*" hidden onChange={imageUploadHandler} />
              <Paper className={classes.uploaded_image}>{data.selectedFile ? <img src={data.selectedFile} /> : null}</Paper>
            </div>

            {/* Form tags filed */}
            <div className={classes.form__tags}>
              <LocalOfferIcon style={{ color: muiTheme.palette.warning.dark }} />
              <Input placeholder="#hash tags (optional)" disableUnderline id="tags" value={data.tags} onChange={(e) => setData({ ...data, tags: e.target.value })} />
            </div>
          </form>
        </Paper>

        <UploadImage />
      </Paper>
      <Error />
      <LoadingAnimation />
    </animated.div>
  );
};

export default PostForm;
