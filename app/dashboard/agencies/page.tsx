import DataTable from '@/components/DataTable'
import { sampleAgencies } from '@/data/sample'

const columns = [
  { key: 'name', label: 'Agency', sortable: true },
  { key: 'city', label: 'City', sortable: true },
  { key: 'country', label: 'Country', sortable: true },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
]

export default function AgenciesPage(){
  return (
    <div className="space-y-6 bg-white dark:bg-primary-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Agencies</h2>
      <DataTable data={sampleAgencies} columns={columns} />
    </div>
  )
}
