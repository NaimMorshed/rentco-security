import "../../assets/styles/Loader.scss";

Loader.defaultProps = {
  text: "Please wait",
};

export default function Loader(props) {
  return (
    <>
      <div className="backdrop">
        <div className="backdrop-content">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span>{props.text}</span>
        </div>
      </div>
    </>
  );
}
