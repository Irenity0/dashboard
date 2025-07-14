import type { status } from "@/board components/KanbanBoard";


async function updateTaskStatusInDB(taskId: string, newStatus: status) {
  try {
    await axios.patch(`http://localhost:5000/events${taskId}`, { status: newStatus });
  } catch (error) {
    console.error("Failed to update task status:", error);
  }
}

export default updateTaskStatusInDB;
