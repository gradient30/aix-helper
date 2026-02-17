import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Export() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">导出配置</h1>
        <p className="text-sm text-muted-foreground">导出您的配置到本地文件</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Download className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="text-lg font-medium text-muted-foreground">即将推出</p>
          <p className="text-sm text-muted-foreground/60">导出功能正在开发中</p>
        </CardContent>
      </Card>
    </div>
  );
}
