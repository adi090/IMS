import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSidebar } from '../context/SidebarContext';

const Dashboard = () => {
  const { isSidebarOpen } = useSidebar();

  const handleDownloadReport = async () => {
    try {
      const response = await axios.get('http://localhost:8080/download-report', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inventory-report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const cardData = [
    {
      title: 'Categories',
      desc: 'Categories refer to different classifications or types of products in the inventory.',
      link: 'categories',
    },
    {
      title: 'Products',
      desc: 'Items being managed in the inventory.',
      link: 'items',
    },
    {
      title: 'Suppliers',
      desc: 'Suppliers are individuals who provide products to the inventory system.',
      link: 'supplier',
    },
    {
      title: 'Outgoing Products',
      desc: 'View all products that are leaving the inventory.',
      link: 'outgoingproduct',
    },
    {
      title: 'Customers',
      desc: 'Customers are individuals who are purchasing products from the store.',
      link: 'customer',
    },
    {
      title: 'Purchased Products',
      desc: 'View all products that have been purchased and added to the inventory.',
      link: 'purchaseproduct',
    },
  ];

  return (
    <div className={`py-14 px-4 w-full flex ${isSidebarOpen ? 'justify-center' : 'justify-start pl-4'}`}>
      <div className={`${isSidebarOpen ? 'max-w-6xl' : 'max-w-7xl'} w-full`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className="w-full p-6 rounded-xl hover:cursor-pointer shadow-md dark:bg-gray-800 hover:shadow-slate-700 transition-transform transform hover:scale-105 duration-300 ease-in-out flex flex-col h-full"
              style={{ backgroundColor: "#adbbc1" }}
            >
              <div className="flex-grow" style={{ minHeight: "120px" }}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">
                  {card.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-700">{card.desc}</p>
              </div>
              <Link
                to={card.link}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-black dark:bg-gray-600 dark:hover:bg-gray-950 dark:focus:ring-gray-900"
              >
                More Info
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          ))}

          {/* Download Report Card */}
          <div
            className="w-full p-6 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer hover:shadow-gray-700 transition-transform transform hover:scale-105 duration-300 ease-in-out flex flex-col h-full"
            style={{ backgroundColor: "#adbbc1" }}
          >
            <div className="flex-grow" style={{ minHeight: "120px" }}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600">
                Download Report
              </h5>
              <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">
                Report of outgoing products and purchased products
              </p>
            </div>
            <button
              onClick={handleDownloadReport}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Download Report
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
