/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';

const CompletedResourcesTable = (props) => {
  const {
    resources,
  } = props;
  const columns = React.useMemo(
    () => [
      // {
      //   Header: 'Id',
      //   accessor: 'id', // accessor is the "key" in the data
      // },
      {
        Header: 'Resource Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Target Amount',
        accessor: 'quantityNeeded', // accessor is the "key" in the data
      },
      {
        Header: 'Collected Amount',
        accessor: 'quantityReceived', // accessor is the "key" in the data
      },
    ],
    [resources],
  );
  const tableInstance = useTable(
    { columns, data: resources },
    useSortBy,
    (hooks) => {
      // eslint-disable-next-line no-shadow
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: 'remainingAmount',
          groupByBoundary: true,
          Header: () => (
            <div>
              Remaining Amount
            </div>
          ),
          Cell: ({ row }) => {
            const remainingAmount = (
              Number(row.original.quantityReceived) > Number(row.original.quantityNeeded)
            )
              ? Number(row.original.quantityReceived) - Number(row.original.quantityNeeded)
              : 0;
            return (
              <div>
                {remainingAmount}
              </div>
            );
          },
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
    <table className="table mb-2" {...getTableProps()}>
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

CompletedResourcesTable.propTypes = {
  resources: PropTypes.array.isRequired,
};

export default CompletedResourcesTable;
