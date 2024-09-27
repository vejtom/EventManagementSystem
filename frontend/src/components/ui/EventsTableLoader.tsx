import { FC } from 'react';

const EventsTableLoader: FC = () => {
  return (
    <div className="overflow-x-auto scroll-smooth scrollbar-thumb-rounded scrollbar-thumb-gray-500">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left w-[30%] max-w-[200px]">Event Name</th>
            <th className="py-2 px-4 text-left w-[40%] max-w-[200px]">Description</th>
            <th className="py-2 px-4 text-left w-[30%]">From Date</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {new Array(10).fill(null).map((_, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4 max-w-[200px]">
                <div className="animate-pulse bg-gray-300 h-[20px] w-[120px] rounded-full my-1.5"></div>
              </td>
              <td className="py-2 px-4 max-w-[200px]">
                <div className="animate-pulse bg-gray-300 h-[20px] w-[160px] rounded-full my-1.5"></div>
              </td>
              <td className="py-2 px-4">
                <div className="animate-pulse bg-gray-300 h-[20px] w-[110px] rounded-full my-1.5"></div>
              </td>
              <td className="py-2 px-4 flex gap-2">
                <div className="animate-pulse bg-gray-300 h-[20px] w-[20px] rounded-full my-1.5"></div>
                <div className="animate-pulse bg-gray-300 h-[20px] w-[20px] rounded-full my-1.5"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTableLoader;
