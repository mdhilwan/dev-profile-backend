import { doc } from 'firebase/firestore';
import { getUser } from './getUser';
import { get } from './utils';

async function getBasicData(db, user) {
  return get(doc(db, 'profiles', user.profileUid));
}

export async function getBasicProfile(db, userId) {
  const user = await getUser(db, userId)
  const basicProfile = await getBasicData(db, user);
  return basicProfile.basic;
}
