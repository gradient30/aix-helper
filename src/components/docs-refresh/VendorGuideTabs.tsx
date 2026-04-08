import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type VendorGuideTabsTool = {
  id: string;
  name: string;
  support_level?: "official" | "unsupported";
};

type VendorGuideTabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  tools: VendorGuideTabsTool[];
  children?: React.ReactNode;
};

export function VendorGuideTabs({ value, onValueChange, tools, children }: VendorGuideTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="space-y-4">
      <div className="rounded-2xl border border-border/70 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted))/0.45)] p-2 shadow-sm">
        <TabsList className="flex h-auto w-full flex-nowrap justify-start gap-2 overflow-x-auto rounded-xl bg-transparent p-0">
          {tools.map((tool) => (
            <TabsTrigger
              key={tool.id}
              value={tool.id}
              className="min-w-max rounded-xl border border-transparent bg-background/70 px-4 py-3 text-sm font-semibold text-muted-foreground shadow-none transition-all hover:border-border hover:text-foreground data-[state=active]:border-primary/30 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <span className="inline-flex items-center gap-2">
                <span>{tool.name}</span>
                {tool.support_level === "unsupported" && (
                  <Badge
                    variant="outline"
                    className="h-5 border-yellow-500/30 bg-yellow-500/10 px-1.5 text-[10px] text-yellow-700"
                  >
                    preview
                  </Badge>
                )}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
}
