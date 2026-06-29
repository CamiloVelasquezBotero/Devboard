import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { TaskFormData } from "../../types";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="taskName"
                >Name of the task</label>
                <input
                    id="taskName"
                    type="text"
                    placeholder="Name of the task"
                    className="w-full p-3  border-gray-300 border"
                    {...register("taskName", {
                        required: "The name of the task is obligatory",
                    })}
                />
                {errors.taskName && (
                    <ErrorMessage>{errors.taskName.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Description of the task</label>
                <textarea
                    id="description"
                    placeholder="Description of the task"
                    className="w-full p-3  border-gray-300 border"
                    {...register("description", {
                        required: "The description of the task is obligatory"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}
