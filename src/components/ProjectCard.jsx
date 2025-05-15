const ProjectCard = ({ title, description, status, members, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-full max-w-md hover:shadow-lg transition-shadow">
      {/* Title and Status */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            status === 'Completed'
              ? 'bg-green-100 text-green-700'
              : status === 'In Progress'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

      {/* Members & Actions */}
      <div className="flex items-center justify-between">
        {/* Members Avatars */}
        <div className="flex -space-x-2 overflow-hidden">
          {members.slice(0, 3).map((m, i) => (
            <img
              key={i}
              src={m.avatar}
              alt={m.name}
              className="w-8 h-8 rounded-full border-2 border-white"
              title={m.name}
            />
          ))}
          {members.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-semibold border-2 border-white">
              +{members.length - 3}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-sm px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
