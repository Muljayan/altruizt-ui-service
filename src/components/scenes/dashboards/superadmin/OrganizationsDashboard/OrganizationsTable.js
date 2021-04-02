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
  let finalLabel = 'Approved';
  if (!row.original.isActivated) {
    finalLabel = 'Unapproved';
  }
  return (
    <button
      type="button"
      onClick={() => {
        onClick(row);
      }}
      className={`btn btn-${row.original.isActivated ? 'primary' : 'red'}`}
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
        history.push(`/opportunities/profile/${clickParam.id}`);
      }}
      className="btn btn-primary"
    >
      View
    </button>
  );
};

const OrganizationsTable = (props) => {
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
      {
        Header: 'Description',
        accessor: 'description', // accessor is the "key" in the data
      },
      {
        Header: 'Email',
        accessor: 'email', // accessor is the "key" in the data
      },
      {
        Header: 'Phone',
        accessor: 'phone', // accessor is the "key" in the data
      },
      {
        Header: 'Address',
        accessor: 'address', // accessor is the "key" in the data
      },
      {
        Header: '​Identification Number',
        accessor: 'identificationNumber', // accessor is the "key" in the data
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
        (organizations && organizations.length === 0)
        && (
          <h5 className="mt-2">Contents not available!</h5>
        )
      }
    </>
  );
};

OrganizationsTable.propTypes = {
  organizations: PropTypes.array.isRequired,
  toggleApprovalStatus: PropTypes.func.isRequired,
};

export default OrganizationsTable;
