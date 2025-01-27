import PropTypes from "prop-types";

export default function Table(props) {
  Table.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
  const { tableData, onEdit, onDelete } = props;
  const tableHeaders = Object.keys(tableData[0]);
  tableHeaders.push("Actions");
  const onEditHandler = (event, index) => {
    onEdit(event, index);
  };
  const onDeleteHandler = (event, index) => {
    onDelete(event, index);
  };
  const tableRows = tableData.map((row, rowIndex) => {
    return (
      <tr key={rowIndex + "_row"}>
        {tableHeaders.map((header, index) => {
          return header !== "Actions" ? (
            <td key={index + "_td"} style={{ padding: "5px" }}>
              {header !== "is_deleted"
                ? row[header]
                : row[header]
                ? "Yes"
                : "No"}
            </td>
          ) : (
            <td key={index + "_td"} style={{ padding: "5px" }}>
              <button onClick={(event) => onEditHandler(event, rowIndex)}>
                Edit
              </button>
              <button onClick={(event) => onDeleteHandler(event, rowIndex)}>
                Delete
              </button>
            </td>
          );
        })}
      </tr>
    );
  });
  return (
    <div className="table">
      <table border={1} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => {
              return (
                <th style={{ padding: "5px" }} key={index + "head"}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}
