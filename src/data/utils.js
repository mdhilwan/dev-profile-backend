import { getDoc } from 'firebase/firestore';

export async function get(ref) {
  const snapshot = await getDoc(ref);
  return snapshot.data();
}
