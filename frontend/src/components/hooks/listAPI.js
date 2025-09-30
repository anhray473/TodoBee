import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addList, deleteList, getList, getTaskByList } from "../../service/api/listService"
import { use } from "react";

export const useGetList = () => {
    return useQuery({
        queryKey: ["list"],
        queryFn: getList
    })
};

// export const useGetTaskByList = (listID) => {
//     return useQuery({
//         queryKey:["task",listID],
//         queryFn:()=>getTaskByList(listID),
//         enabled: !!listID, // chỉ chạy khi có listId
//     })
// }

export const useAddList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addList,
        onSuccess: () => {
            queryClient.invalidateQueries(["list"])
        }
    })
}

export const useDeleteList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteList,
        onSuccess: () => {
            queryClient.invalidateQueries(["list"])
        }
    })
}