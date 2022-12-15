import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { useRepository } from '../context/RepositoryContext';

export default function useCart() {
  const { repository } = useRepository();
  const { uid } = useAuth();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(
    ['carts', uid || ''],
    () => repository.getCart(uid),
    {
      enabled: !!uid,
    }
  );

  const updateItem = useMutation(
    (product) => repository.updateCart(uid, product),
    {
      onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
    }
  );

  const removeItem = useMutation((id) => repository.removeCartItem(uid, id), {
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  return { cartQuery, updateItem, removeItem };
}
