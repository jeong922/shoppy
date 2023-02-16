import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { useRepository } from '../context/RepositoryContext';

export default function useUserInfo() {
  const { repository } = useRepository();
  const { uid } = useAuth();
  const queryClient = useQueryClient();

  const userInfoQuery = useQuery(
    ['profile', uid || ''],
    () => repository.getUserInfo(uid),
    {
      enabled: !!uid,
    }
  );

  const updateUserInfo = useMutation(
    ({ newUserInfo, url }) => repository.updateProfile(uid, newUserInfo, url),
    {
      onSuccess: () => queryClient.invalidateQueries(['profile', uid]),
    }
  );

  // const removeItem = useMutation((id) => repository.removeCartItem(uid, id), {
  //   onSuccess: () => queryClient.invalidateQueries(['profile', uid]),
  // });

  return { userInfoQuery, updateUserInfo };
}

//repository.updateProfile(uid, userInfo, url)
