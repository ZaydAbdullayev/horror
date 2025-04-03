import "./index.scss";

export const GlitchButton = ({ children, onclick }) => {
  return (
    <button
      className={`button-universal-size button-glitch animation`}
      role="button"
      onClick={onclick}
    >
      {children}
    </button>
  );
};
