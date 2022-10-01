const TextBlock = ({ children, title, image }) => {
  return (
    <div className="TextBlock">
      <div className="TextBlock__block">
        <div className="TextBlock__title heading-secondary">{title}</div>
        <div className="TextBlock__text">{children}</div>
      </div>
    </div>
  );
};

export default TextBlock;
