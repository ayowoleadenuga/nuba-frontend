const ErrorMessage = ({ message }: { message?: string }) => {
  return (
    <div className="bg-red-100 text-red-600 px-4 py-3 rounded-md text-sm mt-4">
      {message ?? "Something went wrong. Please try again later."}
    </div>
  );
};

export default ErrorMessage;
