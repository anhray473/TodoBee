import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addTask, deleteTask, getTaskByList, toggleTask, updateTask } from "../../service/api/taskService"

export const useGetTaskByList = (listID) => {
    return useQuery({
        queryKey: ["task", listID],
        queryFn: () => getTaskByList(listID),
        enabled: !!listID,
    });
}

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addTask,
        onSuccess: (variables) => {
            queryClient.invalidateQueries(["task", variables.listID])
        }
    })
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateTask(id, data),
        onSuccess: (variables) => {
            queryClient.invalidateQueries(["task", variables.listID])
        }
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => deleteTask(id),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["task", variables.listID])
        }
    })
}

export const useToggleTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleTask,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["task", variables.listID])
        }
    })
}