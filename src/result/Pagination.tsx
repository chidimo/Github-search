import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { useNavigate } from 'react-location';

import { PageInfoInterface } from './interfaces';

type PaginationProps = {
  itemCount: number;
  pageInfo: PageInfoInterface;
};

export const Pagination = (props: PaginationProps): JSX.Element => {
  const navigate = useNavigate();
  const { pageInfo, itemCount } = props;

  return (
    <div className="centered_text">
      {pageInfo?.hasPreviousPage && (
        <span
          className="pointer"
          data-testid="paginationPrev"
          onClick={() => {
            navigate({
              search: (prev: any) => ({
                ...prev,
                after:
                  prev.after.length === 1
                    ? undefined
                    : prev.after.slice(0, prev.after.length - 1),
              }),
            });
          }}
        >
          <MdNavigateBefore size={30} />
        </span>
      )}

      {pageInfo?.hasNextPage && itemCount >= 10 && (
        <span
          className="pointer"
          data-testid="paginationNext"
          onClick={() => {
            navigate({
              search: (prev: any) => ({
                ...prev,
                after: prev.after
                  ? prev.after.concat(pageInfo.endCursor)
                  : [ pageInfo.endCursor ],
              }),
            });
          }}
        >
          <MdNavigateNext size={30} />
        </span>
      )}
    </div>
  );
};
