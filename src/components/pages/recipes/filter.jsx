function Filter({ filters, activeFilter, setActiveFilter }) {
  return (
    <div className='flex gap-3 mb-4'>
      {filters.map((filter, index) => (
        <button
          key={index}
          onClick={() => setActiveFilter(filter)}
          className={`${activeFilter === filter
              ? "bg-[#036231] text-white"
              : "bg-gray-300 text-gray-500"
            } text-sm font-semibold px-14 py-3 rounded-xl min-w-40`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default Filter;
