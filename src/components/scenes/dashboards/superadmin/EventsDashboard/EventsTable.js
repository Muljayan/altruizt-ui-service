/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';
import { useHistory } from 'react-router-dom';

const ApprovalToggle = (props) => {
  const {
    onClick, row,
  } = props;
  let finalLabel = 'Active';
  if (!row.original.isActive) {
    finalLabel = 'Deactivated';
  }
  return (
    <button
      type="button"
      onClick={() => {
        onClick(row);
      }}
      className={`btn btn-${row.original.isActive ? 'primary' : 'red'}`}
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
        history.push(`/events/profile/${clickParam.id}`);
      }}
      className="btn btn-primary"
    >
      View
    </button>
  );
};

const EventsTable = (props) => {
  const {
    events,
    toggleApprovalStatus,
  } = props;

  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id', // accessor is the "key" in the data
      },
      {
        Header: 'Title',
        accessor: 'title', // accessor is the "key" in the data
      },
    ],
    [events],
  );
  const tableInstance = useTable(
    { columns, data: events },
    useSortBy,
    // useRowSelect,
    (hooks) => {
      // eslint-disable-next-line no-shadow
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: 'activity',
          groupByBoundary: true,
          Header: () => (
            <div>
              Status
            </div>
          ),
          Cell: ({ row }) => (
            <ApprovalToggle
              onClick={toggleApprovalStatus}
              row={row}
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
    <>
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
      {
        (events && events.length === 0)
        && (
          <h5 className="mt-2">Contents not available!</h5>
        )
      }
    </>
  );
};

EventsTable.propTypes = {
  events: PropTypes.array.isRequired,
  toggleApprovalStatus: PropTypes.func.isRequired,
};

export default EventsTable;
