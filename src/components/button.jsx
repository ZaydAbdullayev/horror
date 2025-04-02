import "./index.scss";

export const GlitchButton = ({ children }) => {
  return (
    <button
      className={`button-universal-size button-glitch animation`}
      role="button"
    >
      {children}
    </button>
  );
};
