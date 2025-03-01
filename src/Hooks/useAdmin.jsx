import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  // Ensure user email is available
  const email = user?.email;

  const { data: isAdmin, refetch } = useQuery({
    queryKey: [email, "isAdmin"],
    enabled: !!email , // Only run when email is available and not loading
    queryFn: async () => {
      try {
        if (!email) return false; // Prevents the query from breaking if email is undefined
        console.log("Fetching admin status for:", email);

        const res = await axiosSecure.get(`/user/admin/${email}`);
        console.log("Admin status:", res.data);
        return res.data; // Ensure a return value
      } catch (error) {
        console.error("Error fetching admin status:", error);
        return false; // Fallback return value
      }
    },
  });

  return [isAdmin, refetch];
};

export default useAdmin;