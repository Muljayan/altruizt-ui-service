/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';

const CategoriesTable = (props) => {
  const {
    categories,
  } = props;
  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id', // accessor is the "key" in the data
      },
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
    ],
    [categories],
  );
  const tableInstance = useTable(
    { columns, data: categories },
    useSortBy,
    // useRowSelect,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table className="table" {...getTableProps()}>
      <thead>
        {// Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {
                      // Render the header
                      column.render('Header')
                    }
                    <span>
                      {
                        column.isSorted
                          ? (column.isSortedDesc ? ' 🔻' : ' 🔺')
                          : ''
                      }
                    </span>
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {// Loop over the table rows

          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                  row.cells.map((cell) => (
                    // Apply the cell props
                    <td {...cell.getCellProps()}>
                      {// Render the cell contents
                        cell.render('Cell')
                      }
                    </td>
                  ))
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

CategoriesTable.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoriesTable;
