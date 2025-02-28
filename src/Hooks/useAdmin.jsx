import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const{user,loading} = useAuth()
   const {data: isAdmin,refetch} = useQuery({
    queryKey:[user?.email,'isAdmin'],
    enabled:!loading,
    queryFn:async() =>{

        if(user?.email){
            const res = await axiosSecure.get(`/user/admin/${user.email}`)
        console.log(res.data);
        return res.data;
        }
    }
   })
   return [isAdmin,refetch]

};

export default useAdmin;