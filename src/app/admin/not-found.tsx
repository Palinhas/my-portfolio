import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-6xl font-bold text-card-foreground">404</h1>
      <p className="text-xl text-muted-foreground">
        Página não encontrada no painel de administração.
      </p>
      <Button asChild>
        <Link href="/admin">Voltar ao Dashboard</Link>
      </Button>
    </div>
  );
}
