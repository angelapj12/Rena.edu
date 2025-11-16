import React, { useState, useEffect } from 'react'
import { discoveryService, dataService, userService, bookingService } from '../services/db-existing'

interface DatabaseExplorerProps {}

export const DatabaseExplorer: React.FC<DatabaseExplorerProps> = () => {
  const [tables, setTables] = useState<string[]>([])
  const [selectedTable, setSelectedTable] = useState<string>('')
  const [tableData, setTableData] = useState<any[]>([])
  const [tableColumns, setTableColumns] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [userCount, setUserCount] = useState(0)
  const [bookingCount, setBookingCount] = useState(0)

  // Discover tables on component mount
  useEffect(() => {
    const discoverTables = async () => {
      setLoading(true)
      try {
        console.log('[Explorer] Discovering database structure...')
        const foundTables = await discoveryService.getTables()
        setTables(foundTables)
        
        // Get quick stats
        if (foundTables.includes('users')) {
          const users = await userService.getAllUsers()
          setUserCount(users.length)
        }
        
        if (foundTables.includes('bookings')) {
          const bookings = await bookingService.getAllBookings()
          setBookingCount(bookings.length)
        }
        
        console.log('[Explorer] Discovery complete')
      } catch (error) {
        console.error('[Explorer] Discovery failed:', error)
      }
      setLoading(false)
    }

    discoverTables()
  }, [])

  // Load table data when table is selected
  useEffect(() => {
    if (!selectedTable) return

    const loadTableData = async () => {
      setLoading(true)
      try {
        console.log('[Explorer] Loading data for table:', selectedTable)
        const [data, columns] = await Promise.all([
          dataService.getTableData(selectedTable, 20),
          discoveryService.getTableColumns(selectedTable)
        ])
        setTableData(data)
        setTableColumns(columns)
        console.log('[Explorer] Table data loaded:', data.length, 'rows')
      } catch (error) {
        console.error('[Explorer] Failed to load table data:', error)
        setTableData([])
        setTableColumns([])
      }
      setLoading(false)
    }

    loadTableData()
  }, [selectedTable])

  const renderTableData = () => {
    if (!tableData.length) return <div className="text-gray-500">No data found</div>

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {Object.keys(tableData[0]).map(key => (
                <th key={key} className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.slice(0, 10).map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {Object.values(row).map((value, cellIndex) => (
                  <td key={cellIndex} className="border border-gray-300 px-4 py-2 text-sm">
                    {value === null ? (
                      <span className="text-gray-400 italic">null</span>
                    ) : typeof value === 'object' ? (
                      <span className="text-blue-600 font-mono">
                        {JSON.stringify(value).slice(0, 50)}...
                      </span>
                    ) : (
                      String(value).slice(0, 100)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Database Explorer</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800">Tables Found</h3>
          <p className="text-2xl font-bold text-blue-600">{tables.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800">Users</h3>
          <p className="text-2xl font-bold text-green-600">{userCount}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800">Bookings</h3>
          <p className="text-2xl font-bold text-purple-600">{bookingCount}</p>
        </div>
      </div>

      {/* Tables List */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Available Tables</h2>
        {loading && tables.length === 0 ? (
          <div className="text-gray-500">Loading tables...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {tables.map(table => (
              <button
                key={table}
                onClick={() => setSelectedTable(table)}
                className={`p-3 text-left border rounded-lg transition-colors ${
                  selectedTable === table
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{table}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Table Details */}
      {selectedTable && (
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Table: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{selectedTable}</span>
          </h2>

          {/* Column Schema */}
          {tableColumns.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Column Schema</h3>
              <div className="bg-gray-50 border rounded-lg p-3">
                <div className="grid grid-cols-4 gap-2 text-sm font-medium text-gray-600 mb-2">
                  <div>Column</div>
                  <div>Type</div>
                  <div>Nullable</div>
                  <div>Default</div>
                </div>
                {tableColumns.map((col, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 text-sm py-1 border-t">
                    <div className="font-mono">{col.column_name}</div>
                    <div className="text-blue-600">{col.data_type}</div>
                    <div className={col.is_nullable === 'YES' ? 'text-green-600' : 'text-red-600'}>
                      {col.is_nullable}
                    </div>
                    <div className="text-gray-500 truncate">
                      {col.column_default || 'None'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Table Data */}
          <div>
            <h3 className="font-medium mb-2">Sample Data ({tableData.length} rows)</h3>
            {loading ? (
              <div className="text-gray-500">Loading data...</div>
            ) : (
              renderTableData()
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DatabaseExplorer
