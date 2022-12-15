import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useRepository } from '../context/RepositoryContext';

export default function useProducts() {
  const { repository } = useRepository();
  const queryClient = useQueryClient();

  const productsQuery = useQuery(['products'], () => repository.getProducts(), {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }) => repository.addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(['products']),
    }
  );

  return { productsQuery, addProduct };
}
