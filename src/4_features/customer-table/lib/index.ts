import { SortingState } from '@tanstack/react-table';

export function serializeSorting(sorting: SortingState): string {
    if (!sorting.length) return '';

    const sortParams = sorting.map(sort =>
        `${sort.id}:${sort.desc ? 'desc' : 'asc'}`
    );

    return sortParams.join(',');
}

export function deserializeSorting(sortString: string): SortingState {
    if (!sortString) return [];

    return sortString.split(',').map(sort => {
        const [id, order] = sort.split(':');
        return {
            id,
            desc: order === 'desc'
        };
    });
}

export function sortingToApiParams(sorting: SortingState) {
    if (!sorting.length) return {};

    const firstSort = sorting[0];
    return {
        sortBy: firstSort.id,
        sortOrder: firstSort.desc ? 'desc' as const : 'asc' as const
    };
}