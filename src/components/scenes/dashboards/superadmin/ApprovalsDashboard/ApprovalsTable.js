/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';
import { useHistory } from 'react-router-dom';

const ApprovalToggle = (props) => {
  const {
    onClick, clickParam, label, label2,
  } = props;
  let finalLabel = label;
  if (label2) {
    if (!clickParam.original.isActivated) {
      finalLabel = label2;
    }
  }
  return (
    <button
      type="button"
      onClick={() => {
        onClick(clickParam);
      }}
      className={`btn btn-${clickParam.original.isActivated ? 'primary' : 'red'}`}
    >
      {finalLabel}
    </button>
  );
};

const Button = (props) => {
  const history = useHistory();

  const {
    clickParam,
  } = props;
  return (
    <button
      type="button"
      onClick={() => {
        history.push(`/organizations/profile/${clickParam.id}`);
      }}
      className="btn btn-primary"
    >
      View
    </button>
  );
};

const ApprovalsTable = (props) => {
  const {
    organizations,
    toggleApprovalStatus,
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
    [],
  );
  const tableInstance = useTable(
    { columns, data: organizations },
    useSortBy,
    // useRowSelect,
    (hooks) => {
      // eslint-disable-next-line no-shadow
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: 'approval',
          groupByBoundary: true,
          Header: () => (
            <div>
              Change Status
            </div>
          ),
          Cell: ({ row }) => (
            <ApprovalToggle
              onClick={toggleApprovalStatus}
              clickParam={row}
              label="Approved"
              label2="Approve"
            />
          ),
        },
        {
          id: 'view',
          groupByBoundary: true,
          Header: () => (
            <div>
              View
            </div>
          ),
          Cell: ({ row }) => (
            <Button
              clickParam={row.original}
            />
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

ApprovalsTable.propTypes = {
  organizations: PropTypes.array.isRequired,
};

export default ApprovalsTable;
