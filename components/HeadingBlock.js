const HeadingBlock = ({ children, color }) => {
  return (
    <div className={`HeadingBlock HeadingBlock--${color}`}>
      <h2 className="HeadingBlock__heading heading-secondary">{children}</h2>
    </div>
  );
};

export default HeadingBlock;
