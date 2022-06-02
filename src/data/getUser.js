import { collection, getDocs } from "firebase/firestore";

async function getUsersList(db) {
  const usersCol = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCol);
  return usersSnapshot.docs.map(doc => doc.data())
}

export async function getUser(db, userId) {
  const usersList = await getUsersList(db);
  return usersList.find(users => users.username === userId);
}
