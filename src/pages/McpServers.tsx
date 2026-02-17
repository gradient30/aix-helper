import { Loader2, Server } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function McpServers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">MCP Server 管理</h1>
        <p className="text-sm text-muted-foreground">统一管理 MCP 服务器配置</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Server className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="text-lg font-medium text-muted-foreground">即将推出</p>
          <p className="text-sm text-muted-foreground/60">MCP Server 管理功能正在开发中</p>
        </CardContent>
      </Card>
    </div>
  );
}
