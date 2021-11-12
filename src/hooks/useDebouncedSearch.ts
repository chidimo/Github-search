import { useCallback } from 'react';
import _ from 'underscore';
import { useNavigate } from 'react-location';
import { IS_TEST } from '../dotEnvSettings';

export const useDebouncedSearch = (): any => {
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    _.debounce(
      (input: string) => {
        navigate({
          search: (prev: any) => ({
            ...prev,
            // reset after argument when typing
            after: undefined,
            searchTerm: input,
          }),
        });
      },
      IS_TEST ? 0 : 500
    ),
    []
  );

  return { debouncedSearch };
};
