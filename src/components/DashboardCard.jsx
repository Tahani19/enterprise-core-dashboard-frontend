const DashboardCard = ({
  title,
  value,
  growth,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">

      <h3 className="text-gray-500 mb-2">
        {title}
      </h3>

      <h2 className="text-3xl font-bold mb-2">
        {value}
      </h2>

      <p className="text-green-500 font-medium">
        {growth}
      </p>

    </div>
  );
};

export default DashboardCard;