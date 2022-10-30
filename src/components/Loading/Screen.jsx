// sito components
import SitoContainer from "sito-container";

// prop-types
import PropTypes from "prop-types";

const Loading = (props) => {
  const { sx, visible } = props;

  return (
    <SitoContainer
      sx={{
        opacity: visible ? 1 : 0,
        zIndex: visible ? 99 : -1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 400ms ease",
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        backdropFilter: "blur(4px)",
        ...sx,
      }}
    ></SitoContainer>
  );
};

Loading.defaultProps = {
  sx: {},
  visible: false,
};

Loading.propTypes = {
  sx: PropTypes.objectOf(PropTypes.any),
  visible: PropTypes.bool,
};

export default Loading;
