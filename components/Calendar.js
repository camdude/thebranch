import Section from "../layouts/Section";

const Calendar = ({ url, view, category }) => {
  const iframSrc = `${url}/calendar?embed=true&view=${view}&category=${category}`;
  console.log(iframSrc);

  return (
    <Section>
      <iframe
        src={iframSrc}
        style={({ width: "100%" }, { height: "600px" })}
        className="planning-center-calender-embed"
        frameBorder="0"
      ></iframe>
    </Section>
  );
};

export default Calendar;
