import logo from '../assets/dwd.png'

const Credits = () => {
  return (
    <div className="container-credits">
      <p>Designed and built by</p>
      <a
        href="https://www.developwithderek.com"
        target="_blank"
        rel="noreferrer"
      >
        <img
          id="logo"
          src={logo}
          alt="DWD"
        />
      </a>
    </div>
  );
};

export default Credits;
