const stats = [
    { id: 1, name: 'Users on the platform', value: '8,000+' },
    { id: 2, name: 'Hiring companies', value: '9,800' },
    { id: 3, name: 'Available jobs', value: '10,756' },
    { id: 4, name: 'Hiring rate', value: '89%' },
  ]
  
  export default function Stats() {
    return (
      <div className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <dl className="mt-8 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col bg-gray-700/5 p-4">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  }
  