import * as React from "react";
import { Check, ChevronsUpDown, Circle, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export type ComboItem = {
  id: string | number;
  label: string;
  name?: string;
  meta?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type ComboBoxProps<T extends ComboItem> = {
  items?: T[];
  value?: T | null;
  onChange: (item: T | null) => void;
  placeholder?: string;
  className?: string;
  contentClassName?: string;
  itemClassName?: string;
  defaultIcon?: React.ComponentType<{ className?: string }>;

  enableApiSearch?: boolean;
  onSearchChange?: (search: string) => void;
  isLoading?: boolean;
};

export default function ComboBox<T extends ComboItem>({
  items = [],
  value,
  onChange,
  placeholder = "Select...",
  className,
  contentClassName,
  itemClassName,
  defaultIcon: DefaultIconProp,
  enableApiSearch,
  onSearchChange,
  isLoading = false,
}: ComboBoxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const listRef = React.useRef<HTMLDivElement | null>(null);

  const selected: ComboItem | null = React.useMemo(() => {
    if (!value) return null;
    return items.find((it) => it.id === (value as ComboItem).id) ?? null;
  }, [value, items]);

  const filtered = React.useMemo(() => {
    if (enableApiSearch) {
      return items;
    }
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((it) => it.label.toLowerCase().includes(q));
  }, [items, query, enableApiSearch]);

  const FallbackIcon = DefaultIconProp ?? Circle;

  React.useEffect(() => {
    if (!enableApiSearch) return;

    const handler = setTimeout(() => {
      onSearchChange?.(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query, onSearchChange, enableApiSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={`w-40 justify-between ${className ?? ""}`}
        >
          {selected ? (
            <div className="flex items-center gap-2 min-w-0">
              <span className="truncate" title={selected.label}>
                {selected.label}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          {selected ? (
            <button
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
            >
              <X className="h-4 w-4 opacity-70 " />
            </button>
          ) : (
            <ChevronsUpDown className="h-4 w-4 opacity-70 " />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className={`w-[260px] p-0 ${contentClassName ?? ""}`}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList
            key={filtered.map((it) => it.id).join(",")}
            ref={listRef}
            className="max-h-60 overflow-y-auto"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup>
                  {filtered.map((item) => {
                    const isSelected = selected?.id === item.id;
                    const Icon = item.icon ?? FallbackIcon;
                    return (
                      <CommandItem
                        data-combobox-item
                        key={item.id}
                        onSelect={() => {
                          setOpen(false);
                          if (!enableApiSearch) setQuery("");
                          onChange(item as T);
                        }}
                        className={`flex justify-between items-center ${itemClassName ?? ""} ${
                          isSelected ? "bg-accent" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="capitalize text-sm">{item.label}</div>
                        </div>
                        {isSelected ? <Check className="h-4 w-4" /> : null}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
