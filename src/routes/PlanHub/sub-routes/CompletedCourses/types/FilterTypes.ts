export interface Filter {
    code: string,
    levels: string | string[],
    faculty: string,
    discipline: string
}

export interface FilterState{
    filters: Filter,
    setFilters: React.Dispatch<React.SetStateAction<Filter>>,
}