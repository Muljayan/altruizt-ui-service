/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy, useRowSelect } from 'react-table';

const ResourceTable = (props) => {
  const {
    resourcesReceived, resources,
    removeResource,
  } = props;
  console.log({ resourcesReceived });
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Unit',
        accessor: 'unit',
      },
    ],
    [resources],
  );
  const tableInstance = useTable(
    { columns, data: resources },
    useSortBy,
    useRowSelect,
    (hooks) => {
      // eslint-disable-next-line no-shadow
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: 'delete',
          // Make this column a groupByBoundary. This ensures that groupBy columns
          // are placed after it
          groupByBoundary: true,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: () => (
            <div>
              Delete
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <button
              type="button"
              disabled={(resourcesReceived && resourcesReceived.length === 0)}
              onClick={() => {
                removeResource(row.original);
              }}
              className="btn btn-red"
            >
              Delete
            </button>
          ),
        },
      ]);
    },
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

ResourceTable.propTypes = {
  resources: PropTypes.array.isRequired,
  resourcesReceived: PropTypes.array,
};

ResourceTable.defaultProps = {
  resourcesReceived: null,
};

export default ResourceTable;
