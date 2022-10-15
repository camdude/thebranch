import Link from "next/link";

const Table = ({ headings, data }) => {
  return (
    <table className="Table">
      <thead>
        <tr className="Table__headRow">
          {headings.map((x, i) => {
            return (
              <th className="Table__headCol" key={i}>
                {x}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => {
          return (
            <tr className="Table__bodyRow" key={i}>
              {row.map((col, i) => {
                return (
                  <td className="Table__bodyCol" key={i}>
                    {Array.isArray(col) ? (
                      <Link href={col[1]}>{col[0]}</Link>
                    ) : (
                      col
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
