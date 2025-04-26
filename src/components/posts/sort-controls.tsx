import { ArrowDown, ArrowUp, Clock, Text } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  sortBy: string;
  sortOrder: string;
  onSortByChange: (value: string) => void;
  onSortOrderToggle: () => void;
}

export function SortControls({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderToggle,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_datetime">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Date</span>
              </div>
            </SelectItem>
            <SelectItem value="title">
              <div className="flex items-center gap-2">
                <Text size={16} />
                <span>Title</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={onSortOrderToggle}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        {sortOrder === "asc" ? (
          <>
            <ArrowUp size={16} /> Ascending
          </>
        ) : (
          <>
            <ArrowDown size={16} /> Descending
          </>
        )}
      </Button>
    </div>
  );
}
