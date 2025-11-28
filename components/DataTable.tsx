'use client'

import { useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  searchable?: boolean
  onRowClick?: (row: any) => void
}

export default function DataTable({ data, columns, searchable = true, onRowClick }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const filteredData = data.filter(item =>
    columns.some(column =>
      String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div className="card overflow-hidden bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-800">
      {/* Search and filters */}
      {searchable && (
        <div className="p-4 border-b border-gray-200 dark:border-primary-800 bg-gray-50 dark:bg-primary-800">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-primary-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-primary-800 border-b border-gray-200 dark:border-primary-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                    column.sortable && "cursor-pointer hover:bg-gray-100 dark:hover:bg-primary-700 transition-colors"
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={cn(
                            "w-3 h-3 -mb-1",
                            sortColumn === column.key && sortDirection === 'asc' 
                              ? "text-primary-600" 
                              : "text-gray-300 dark:text-gray-600"
                          )} 
                        />
                        <ChevronDown 
                          className={cn(
                            "w-3 h-3 -mt-1",
                            sortColumn === column.key && sortDirection === 'desc' 
                              ? "text-primary-600" 
                              : "text-gray-300 dark:text-gray-600"
                          )} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-primary-900 divide-y divide-gray-200 dark:divide-primary-800">
            {sortedData.map((row, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 dark:hover:bg-primary-800 transition-colors group cursor-pointer"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td 
                    key={column.key} 
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 group-hover:text-gray-700 dark:group-hover:text-white"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-primary-800 bg-gray-50 dark:bg-primary-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {sortedData.length} of {data.length} entries
        </p>
      </div>
    </div>
  )
}
