import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  orderBy 
} from "firebase/firestore";
import { db } from "./firebase";
import { Task } from "../types/task";

const TASKS_COLLECTION = "tasks";

// CREATE: Add a new task
export const createTask = async (task: Omit<Task, 'id'>) => {
  const docRef = await addDoc(collection(db, TASKS_COLLECTION), task);
  return docRef.id;
};

// READ: Get all tasks for a specific user
export const getTasks = async (userId: string): Promise<Task[]> => {
  const q = query(
    collection(db, TASKS_COLLECTION), 
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Task));
};

// UPDATE: Change task status or details
export const updateTask = async (taskId: string, updates: Partial<Task>) => {
  const taskRef = doc(db, TASKS_COLLECTION, taskId);
  await updateDoc(taskRef, updates);
};

// DELETE: Remove a task
export const deleteTask = async (taskId: string) => {
  const taskRef = doc(db, TASKS_COLLECTION, taskId);
  await deleteDoc(taskRef);
};