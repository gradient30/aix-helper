import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Prompts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Prompts 管理</h1>
        <p className="text-sm text-muted-foreground">管理系统提示词预设</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <FileText className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="text-lg font-medium text-muted-foreground">即将推出</p>
          <p className="text-sm text-muted-foreground/60">Prompts 管理功能正在开发中</p>
        </CardContent>
      </Card>
    </div>
  );
}
