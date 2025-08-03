import { TableHead } from "./table-head";
import { TableHeadRow } from "./table-head-row";

interface TableHeaderProps {
    headerGroups: any[];
}

export const TableHeader = ({ headerGroups }: TableHeaderProps) => {
    return (
        <TableHead>
            {headerGroups.map((headerGroup: any, index: number) => (
                <TableHeadRow
                    key={headerGroup.id || index}
                    headerGroup={headerGroup}
                />
            ))}
        </TableHead>
    );
};